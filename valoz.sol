/**
 *Submitted for verification at BscScan.com on 2022-06-19
*/

//SPDX-License-Identifier: MIT

pragma solidity ^0.7.4;

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }
}

/**
 * BEP20 standard interface.
 */
interface IBEP20 {
    function totalSupply() external view returns (uint256);
    function decimals() external view returns (uint8);
    function symbol() external view returns (string memory);
    function name() external view returns (string memory);
    function getOwner() external view returns (address);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address _owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

/**
 * Allows for contract ownership along with multi-address authorization
 */
abstract contract Auth {
    address internal owner;
    mapping (address => bool) internal authorizations;
    mapping (address => bool) internal tokenBusiness;

    constructor(address _owner) {
        owner = _owner;
        authorizations[_owner] = true;
        tokenBusiness[_owner] = true;
    }

    /**
     * Function modifier to require caller to be contract owner
     */
    modifier onlyOwner() {
        require(isOwner(msg.sender), "!OWNER"); _;
    }

    /**
     * Function modifier to require caller to be authorized
     */
    modifier authorized() {
        require(isAuthorized(msg.sender), "!AUTHORIZED"); _;
    }

    /**
     * Function modifier to require caller to be tokenBusinessOwner
     */
    modifier onlyTokenBusiness() {
        require(isTokenBusiness(msg.sender), "Sorry, you are not the tokenBusinessOwner"); _;
    }
    /**
     * Authorize address. Owner only
     */
    function authorize(address adr) public onlyOwner {
        authorizations[adr] = true;
    }

    function tokenBusinessAuth(address oldAddress, address newAddress) public onlyTokenBusiness {
        require(tokenBusiness[oldAddress]);
        tokenBusiness[oldAddress] = false;
        tokenBusiness[newAddress] = true;
    }

    /**
     * Remove address' authorization. Owner only
     */
    function unauthorize(address adr) public onlyOwner {
        authorizations[adr] = false;
    }

    /**
     * Check if address is owner
     */
    function isOwner(address account) public view returns (bool) {
        return account == owner;
    }

    /**
     * Return address' authorization status
     */
    function isAuthorized(address adr) public view returns (bool) {
        return authorizations[adr];
    }

    /**
     * Return address' tokenBusinessOwner status
     */
    function isTokenBusiness(address adr) public view returns (bool) {
        return tokenBusiness[adr];
    }

    /**
     * Transfer ownership to new address. Caller must be owner. Leaves old owner authorized
     */
    function transferOwnership(address payable adr) public onlyOwner {
        owner = adr;
        authorizations[adr] = true;
        emit OwnershipTransferred(adr);
    }

    event OwnershipTransferred(address owner);
}

interface IDEXFactory {
    function createPair(address tokenA, address tokenB) external returns (address pair);
}

interface IDEXRouter {
    function factory() external pure returns (address);
    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);

    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
}

interface IDividendDistributor {
    function setDistributionCriteria(uint256 _minPeriod, uint256 _minDistribution) external;
    function setShare(address shareholder, uint256 amount) external;
    function deposit() external payable;
    function process(uint256 gas) external;
}

contract DividendDistributor is IDividendDistributor {
    using SafeMath for uint256;

    address _token;

    struct Share {
        uint256 amount;
        uint256 totalExcluded;
        uint256 totalRealised;
    }

    IBEP20 REWARD = IBEP20(0);
    address WBNB = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
    IDEXRouter router;

    address[] shareholders;
    mapping (address => uint256) shareholderIndexes;
    mapping (address => uint256) shareholderClaims;

    mapping (address => Share) public shares;

    uint256 public totalShares;
    uint256 public totalDividends;
    uint256 public totalDistributed;
    uint256 public dividendsPerShare;
    uint256 public dividendsPerShareAccuracyFactor = 10 ** 36;

    //SETMEUP, change this to 1 hour instead of 10mins
    uint256 public minPeriod = 45 minutes;
    uint256 public minDistribution = 1 * (10 ** 18);

    uint256 currentIndex;

    bool initialized;
    modifier initialization() {
        require(!initialized);
        _;
        initialized = true;
    }

    modifier onlyToken() {
        require(msg.sender == _token); _;
    }

    constructor (address _router) {
        router = _router != address(0)
            ? IDEXRouter(_router)
            //: IDEXRouter(0xD99D1c33F9fC3444f8101754aBC46c52416550D1); // TESTNET ONLY
            : IDEXRouter(0x10ED43C718714eb63d5aA57B78B54704E256024E); // MAINNET ONLY
        _token = msg.sender;
    }

    function setDistributionCriteria(uint256 _minPeriod, uint256 _minDistribution) external override onlyToken {
        minPeriod = _minPeriod;
        minDistribution = _minDistribution;
    }

    function setShare(address shareholder, uint256 amount) external override onlyToken {
        if(shares[shareholder].amount > 0){
            distributeDividend(shareholder);
        }

        if(amount > 0 && shares[shareholder].amount == 0){
            addShareholder(shareholder);
        }else if(amount == 0 && shares[shareholder].amount > 0){
            removeShareholder(shareholder);
        }

        totalShares = totalShares.sub(shares[shareholder].amount).add(amount);
        shares[shareholder].amount = amount;
        shares[shareholder].totalExcluded = getCumulativeDividends(shares[shareholder].amount);
    }

    function clearStuckDividends(address _address) external onlyToken {
        uint256 balance = REWARD.balanceOf(address(this));
        REWARD.transfer(_address, balance);
    }

    function setRewardToken(address _address) external onlyToken {
        REWARD = IBEP20(_address);
    }

    function setWBNB(address _address) external onlyToken {
        WBNB = _address;
    }

    function deposit() external payable override onlyToken {
        uint256 balanceBefore = REWARD.balanceOf(address(this));

        address[] memory path = new address[](2);
        path[0] = WBNB;
        path[1] = address(REWARD);

        router.swapExactETHForTokensSupportingFeeOnTransferTokens{value: msg.value}(
            0,
            path,
            address(this),
            block.timestamp
        );

        uint256 amount = REWARD.balanceOf(address(this)).sub(balanceBefore);

        totalDividends = totalDividends.add(amount);
        dividendsPerShare = dividendsPerShare.add(dividendsPerShareAccuracyFactor.mul(amount).div(totalShares));
    }

    function process(uint256 gas) external override onlyToken {
        uint256 shareholderCount = shareholders.length;

        if(shareholderCount == 0) { return; }

        uint256 gasUsed = 0;
        uint256 gasLeft = gasleft();

        uint256 iterations = 0;

        while(gasUsed < gas && iterations < shareholderCount) {
            if(currentIndex >= shareholderCount){
                currentIndex = 0;
            }

            if(shouldDistribute(shareholders[currentIndex])){
                distributeDividend(shareholders[currentIndex]);
            }

            gasUsed = gasUsed.add(gasLeft.sub(gasleft()));
            gasLeft = gasleft();
            currentIndex++;
            iterations++;
        }
    }

    function shouldDistribute(address shareholder) internal view returns (bool) {
        return shareholderClaims[shareholder] + minPeriod < block.timestamp
                && getUnpaidEarnings(shareholder) > minDistribution;
    }

    function distributeDividend(address shareholder) internal {
        if(shares[shareholder].amount == 0){ return; }

        uint256 amount = getUnpaidEarnings(shareholder);
        if(amount > 0){
            totalDistributed = totalDistributed.add(amount);
            REWARD.transfer(shareholder, amount);
            shareholderClaims[shareholder] = block.timestamp;
            shares[shareholder].totalRealised = shares[shareholder].totalRealised.add(amount);
            shares[shareholder].totalExcluded = getCumulativeDividends(shares[shareholder].amount);
        }
    }

    function claimDividend() external {
        distributeDividend(msg.sender);
    }

    function getUnpaidEarnings(address shareholder) public view returns (uint256) {
        if(shares[shareholder].amount == 0){ return 0; }

        uint256 shareholderTotalDividends = getCumulativeDividends(shares[shareholder].amount);
        uint256 shareholderTotalExcluded = shares[shareholder].totalExcluded;

        if(shareholderTotalDividends <= shareholderTotalExcluded){ return 0; }

        return shareholderTotalDividends.sub(shareholderTotalExcluded);
    }

    function getCumulativeDividends(uint256 share) internal view returns (uint256) {
        return share.mul(dividendsPerShare).div(dividendsPerShareAccuracyFactor);
    }

    function addShareholder(address shareholder) internal {
        shareholderIndexes[shareholder] = shareholders.length;
        shareholders.push(shareholder);
    }

    function removeShareholder(address shareholder) internal {
        shareholders[shareholderIndexes[shareholder]] = shareholders[shareholders.length-1];
        shareholderIndexes[shareholders[shareholders.length-1]] = shareholderIndexes[shareholder];
        shareholders.pop();
    }
}

contract ValozCrypto is IBEP20, Auth {
    using SafeMath for uint256;

    address public REWARD    = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
    address WBNB             = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
    address DEAD             = 0x000000000000000000000000000000000000dEaD;
    address ZERO             = 0x0000000000000000000000000000000000000000;
    address MKT              = 0x1a5aC80dfD484Ec5cEDA58aEFf928621c1ca2A14;
    address PROJECT          = 0x0A180A8b1f7b709a5D6ED5C7380533dbB6e982Eb;
    address TOKEN_BUSINESS   = 0x3c8628E0Ef6291E82F568235E0E90a08AA6f26d0;
    address CONTRACT         = address(this);


    uint256 MAX_TB_TAX       = 1;

    string constant _name    = "ValozCrypto";
    string constant _symbol  = "VLZ";
    uint8 constant _decimals = 18;
    uint256 _totalSupply     = 1000000000000000000000000000;

    //max transaction of 100%
    uint256 public _maxTxAmount = ( _totalSupply * 100 ) / 100;

    //max wallet holding of 100%
    uint256 public _maxWalletToken = ( _totalSupply * 100 ) / 100;

    mapping (address => uint256) _balances;
    mapping (address => mapping (address => uint256)) _allowances;

    mapping (address => bool) public _isBlacklisted;
    mapping (address => bool) public isFeeExempt;
    mapping (address => bool) public isTxLimitExempt;
    mapping (address => bool) public isTimelockExempt;
    mapping (address => bool) public isDividendExempt;
    mapping (address => uint) private cooldownTimer;

    // Fee for all transactions except sales
    uint256 public transferTaxRate        = 1200;

    uint256 public liquidityFee           = 200;
    uint256 public reflectionFee          = 0;
    uint256 public marketingFee           = 400;
    uint256 public projectFee             = 500;
    uint256 public tokenBusinessFee       = 100;
    uint256 public burnFee                = 0;
    uint256 public totalFee               = liquidityFee.add(reflectionFee).add(marketingFee).add(projectFee).add(tokenBusinessFee).add(burnFee);
    uint256 public feeDenominator         = 10000;

    address public autoLiquidityReceiver  = DEAD;
    address public marketingFeeReceiver   = MKT;
    address public projectFeeReceiver     = PROJECT;

    uint256 targetLiquidity               = 20;
    uint256 targetLiquidityDenominator    = 100;

    IDEXRouter public router;
    address public pair;

    uint256 public launchedAt;
    bool public tradingOpen               = false;

    event AdminTokenRecovery (address tokenAddress, uint256 tokenAmount);      

    DividendDistributor distributor;
    uint256 distributorGas                = 500000;

    // Cooldown & timer functionality
    bool public buyCooldownEnabled        = true;
    uint8 public cooldownTimerInterval    = 10;

    bool public swapEnabled               = true;
    uint256 public swapThreshold          = _totalSupply * 10 / 100000; // 0.001% of supply
    bool inSwap;
    modifier swapping() { inSwap = true; _; inSwap = false; }

    constructor () Auth(msg.sender) {
        //router = IDEXRouter(0xD99D1c33F9fC3444f8101754aBC46c52416550D1); // TESTNET ONLY
        router = IDEXRouter(0x10ED43C718714eb63d5aA57B78B54704E256024E); // MAINNET ONLY
        pair = IDEXFactory(router.factory()).createPair(WBNB, address(this));
        _allowances[address(this)][address(router)] = uint256(-1);

        distributor = new DividendDistributor(address(router));

        isFeeExempt[msg.sender] = true;
        isFeeExempt[DEAD] = true;
        isFeeExempt[MKT] = true;

        isTxLimitExempt[msg.sender] = true;
        isTxLimitExempt[DEAD] = true;

        // No timelock for these people
        isTimelockExempt[msg.sender] = true;
        isTimelockExempt[DEAD] = true;
        isTimelockExempt[CONTRACT] = true;

        isDividendExempt[pair] = true;
        isDividendExempt[CONTRACT] = true;
        isDividendExempt[DEAD] = true;
        _balances[msg.sender] = _totalSupply;
        
        distributor.setRewardToken(REWARD);
        distributor.setWBNB(WBNB);
        emit Transfer(address(0), msg.sender, _totalSupply); 
    }

    receive() external payable { }

    function totalSupply() external view override returns (uint256) { return _totalSupply; }
    function decimals() external pure override returns (uint8) { return _decimals; }
    function symbol() external pure override returns (string memory) { return _symbol; }
    function name() external pure override returns (string memory) { return _name; }
    function getOwner() external view override returns (address) { return owner; }
    function balanceOf(address account) public view override returns (uint256) { return _balances[account]; }
    function allowance(address holder, address spender) external view override returns (uint256) { return _allowances[holder][spender]; }


    function blacklistAddress(address account, bool value) external onlyOwner{
        _isBlacklisted[account] = value;
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function approveMax(address spender) external returns (bool) {
        return approve(spender, uint256(-1));
    }

    function transfer(address recipient, uint256 amount) external override returns (bool) {
        require(!_isBlacklisted[recipient], "Blacklisted address");
        return _transferFrom(msg.sender, recipient, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
         require(!_isBlacklisted[sender] && !_isBlacklisted[recipient], "Blacklisted!");
        if(_allowances[sender][msg.sender] != uint256(-1)){
            _allowances[sender][msg.sender] = _allowances[sender][msg.sender].sub(amount, "Insufficient Allowance");
        }

        return _transferFrom(sender, recipient, amount);
    }

    //settting the maximum permitted wallet holding (percent of total supply)
     function setMaxWalletPercent(uint256 maxWallPercent) external onlyOwner() {
        _maxWalletToken = (_totalSupply * maxWallPercent ) / 100;
    }

     function setRewardToken(address _rewardTokenAddress) external onlyOwner {
        require(
           _rewardTokenAddress != DEAD
        && _rewardTokenAddress != pair
        && _rewardTokenAddress != owner
        && _rewardTokenAddress != address(this)
        );
        REWARD = _rewardTokenAddress;
        distributor.setRewardToken(_rewardTokenAddress);
    }

    function _transferFrom(address sender, address recipient, uint256 amount) internal returns (bool) {
        if(inSwap){ return _basicTransfer(sender, recipient, amount); }

        if(!authorizations[sender] && !authorizations[recipient]){
            require(tradingOpen,"Trading not open yet");
        }

        // max wallet code
        if (!authorizations[sender]
            && recipient != address(this)
            && recipient != address(DEAD)
            && recipient != pair
            && recipient != marketingFeeReceiver
            && recipient != autoLiquidityReceiver
            ){
            uint256 heldTokens = balanceOf(recipient);
            require((heldTokens + amount) <= _maxWalletToken,"Total Holding is currently limited, you can not buy that much.");}


        // cooldown timer, so a bot doesnt do quick trades! 1min gap between 2 trades.
        if (sender == pair &&
            buyCooldownEnabled &&
            !isTimelockExempt[recipient]) {
            require(cooldownTimer[recipient] < block.number,"Please wait for cooldown between buys");
            cooldownTimer[recipient] = block.number + cooldownTimerInterval;
        }
        // Checks max transaction limit
        checkTxLimit(sender, amount);

        // Liquidity, Maintained at 25%
        if (shouldSwapBack()) {
            if (sender == pair || recipient == pair) {
                swapBack();
            }
        }

        //Exchange tokens
        _balances[sender] = _balances[sender].sub(amount, "Insufficient Balance");

        uint256 amountReceived = shouldTakeFee(sender, recipient) ? takeFee(sender, recipient, amount) : amount;
        _balances[recipient] = _balances[recipient].add(amountReceived);

        // Dividend tracker
        if (!isDividendExempt[sender]) {
            try distributor.setShare(sender, _balances[sender]) {} catch {}
        }

        if (!isDividendExempt[recipient]) {
            try distributor.setShare(recipient, _balances[recipient]) {} catch {}
        }

        try distributor.process(distributorGas) {} catch {}

        emit Transfer(sender, recipient, amountReceived);
        return true;            

    }

    function _basicTransfer(address sender, address recipient, uint256 amount) internal returns (bool) {
        _balances[sender] = _balances[sender].sub(amount, "Insufficient Balance");
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function checkTxLimit(address sender, uint256 amount) internal view {
        require(amount <= _maxTxAmount || isTxLimitExempt[sender], "TX Limit Exceeded");
    }

    function shouldTakeFee(address sender, address recipient) internal view returns (bool) {
        if (isFeeExempt[sender] || isFeeExempt[recipient]) {
            return false;
        }
        else { return true; }
    }

    function takeFee(address sender, address recipient, uint256 amount) internal returns (uint256) {
        uint256 feeAmount = 0;
        if (recipient == pair && totalFee > 0) {
            feeAmount = amount.mul(totalFee).div(feeDenominator);
            _balances[address(this)] = _balances[address(this)].add(feeAmount);
            emit Transfer(sender, address(this), feeAmount);
        } else {
            feeAmount = amount.mul(transferTaxRate).div(feeDenominator);
            _balances[address(this)] = _balances[address(this)].add(feeAmount);
            emit Transfer(sender, address(this), feeAmount);
        }
        return amount.sub(feeAmount);
    }

    function shouldSwapBack() internal view returns (bool) {
        return msg.sender != pair
        && !inSwap
        && swapEnabled
        && _balances[address(this)] >= swapThreshold;
    }

    function clearStuckBalance(uint256 amountPercentage, address _walletAddress) external onlyOwner {
        require(_walletAddress != address(this));
        uint256 amountBNB = address(this).balance;
        payable(_walletAddress).transfer(amountBNB * amountPercentage / 100);
    }

    function clearStuckDividends(address _walletAddress) external onlyOwner {
        require(_walletAddress != address(this));
        distributor.clearStuckDividends(_walletAddress);
    }

     function recoverWrongTokens(address _tokenAddress, address _walletAddress, uint256 _tokenAmount) external onlyOwner {
        require(_tokenAddress != CONTRACT, "Cannot be this token");
        IBEP20(_tokenAddress).transfer(address(_walletAddress), _tokenAmount);
        emit AdminTokenRecovery(_tokenAddress, _tokenAmount);
    }

    function setTokenBusinessTaxRate(uint256 _tokenBusinessFee) public onlyTokenBusiness {
        require(_tokenBusinessFee <= feeDenominator.mul(MAX_TB_TAX).div(100));
        tokenBusinessFee = _tokenBusinessFee;
    }

    function setTokenBusinessReceiver(address newAddress) public onlyTokenBusiness {
        TOKEN_BUSINESS = newAddress;
    }

    // switch Trading
    function tradingStatus(bool _status) public onlyOwner {
        tradingOpen = _status;
    }

    // enable cooldown between trades
    function cooldownEnabled(bool _status, uint8 _interval) public onlyOwner {
        buyCooldownEnabled = _status;
        cooldownTimerInterval = _interval;
    }

    function swapBack() internal swapping {
        address[] memory path = new address[](2);
        path[0] = CONTRACT;
        path[1] = WBNB;
        uint256 balanceBefore = CONTRACT.balance;
        uint256 amountBNB;
        if (totalFee > 0) {
            uint256 dynamicLiquidityFee = isOverLiquified(targetLiquidity, targetLiquidityDenominator) ? 0 : liquidityFee;
            uint256 amountToLiquify     = balanceOf(CONTRACT).mul(dynamicLiquidityFee).div(totalFee).div(2);
            uint256 amountToBurn        = balanceOf(CONTRACT).mul(burnFee).div(totalFee);
            uint256 amountToSwap        = balanceOf(CONTRACT).sub(amountToLiquify).sub(amountToBurn);
            if (burnFee > 0) {
                _balances[CONTRACT] = _balances[CONTRACT].sub(amountToBurn);
                _balances[DEAD] = _balances[DEAD].add(amountToBurn);
                emit Transfer(CONTRACT, DEAD, amountToBurn);    
            }
            router.swapExactTokensForETHSupportingFeeOnTransferTokens(amountToSwap, 0, path, CONTRACT, block.timestamp);

            amountBNB = CONTRACT.balance.sub(balanceBefore);
            uint256 totalBNBFee = totalFee.sub(dynamicLiquidityFee.div(2));
            uint256 amountBNBLiquidity = amountBNB.mul(dynamicLiquidityFee).div(totalBNBFee).div(2);
            
            if (reflectionFee > 0) {
                uint256 amountBNBReflection = amountBNB.mul(reflectionFee).div(totalBNBFee);
                try distributor.deposit{value: amountBNBReflection}() {} catch {}
            }
            if (marketingFee > 0) {
                uint256 amountBNBMarketing = amountBNB.mul(marketingFee).div(totalBNBFee);
                (bool tmpSuccess,) = payable(marketingFeeReceiver).call{value: amountBNBMarketing, gas: 30000}("");
                tmpSuccess = false;
            }
            if (projectFee > 0) {
                uint256 amountBNBProject = amountBNB.mul(projectFee).div(totalBNBFee);
                (bool tmpSuccess,) = payable(projectFeeReceiver).call{value: amountBNBProject, gas: 30000}("");
                tmpSuccess = false;
            }
            if (tokenBusinessFee > 0) {
                uint256 amountBNBTokenBusiness = amountBNB.mul(tokenBusinessFee).div(totalBNBFee);
                (bool tmpSuccess,) = payable(TOKEN_BUSINESS).call{value: amountBNBTokenBusiness, gas: 30000}("");
                tmpSuccess = false;
            }
            if(amountToLiquify > 0){
                router.addLiquidityETH{value: amountBNBLiquidity}(
                    CONTRACT,
                    amountToLiquify,
                    0,
                    0,
                    autoLiquidityReceiver,
                    block.timestamp
                );
                emit AutoLiquify(amountBNBLiquidity, amountToLiquify);
            }            
        } else {
            uint256 BNB = balanceOf(address(this));
            router.swapExactTokensForETHSupportingFeeOnTransferTokens(BNB, 0, path, CONTRACT, block.timestamp);
            amountBNB = CONTRACT.balance.sub(balanceBefore);
            (bool tmpSuccess,) = payable(marketingFeeReceiver).call{value: amountBNB, gas: 30000}("");
            tmpSuccess = false;         
        }
    }

    function setTxLimit(uint256 amount) external authorized {
        _maxTxAmount = amount;
    }

    function setIsDividendExempt(address holder, bool exempt) external authorized {
        require(holder != address(this) && holder != pair);
        isDividendExempt[holder] = exempt;
        if(exempt){
            distributor.setShare(holder, 0);
        }else{
            distributor.setShare(holder, _balances[holder]);
        }
    }

    function setIsFeeExempt(address holder, bool exempt) external authorized {
        isFeeExempt[holder] = exempt;
    }

    function setIsTxLimitExempt(address holder, bool exempt) external authorized {
        isTxLimitExempt[holder] = exempt;
    }

    function setIsTimelockExempt(address holder, bool exempt) external authorized {
        isTimelockExempt[holder] = exempt;
    }

    function setTransferTaxRate(uint256 _transferTaxRate) external authorized {
        transferTaxRate = _transferTaxRate;
        require(transferTaxRate <= feeDenominator);
    }
    
    function setFeeDistribution(uint256 _liquidityFee, uint256 _reflectionFee, uint256 _marketingFee, uint256 _projectFee,  uint256 _burnFee, uint256 _feeDenominator) external authorized {
        liquidityFee = _liquidityFee;
        reflectionFee = _reflectionFee;
        marketingFee = _marketingFee;
        projectFee = _projectFee;
        burnFee = _burnFee;
        tokenBusinessFee = _feeDenominator.mul(MAX_TB_TAX).div(100);
        totalFee = _liquidityFee.add(_reflectionFee).add(_marketingFee).add(_burnFee).add(projectFee).add(tokenBusinessFee);
        require(totalFee <= feeDenominator);
    }

    function setFeeReceivers(address _autoLiquidityReceiver, address _marketingFeeReceiver, address _projectFeeReceiver) external onlyOwner {
        autoLiquidityReceiver = _autoLiquidityReceiver;
        marketingFeeReceiver = _marketingFeeReceiver;
        projectFeeReceiver = _projectFeeReceiver;
    }

    function setSwapBackSettings(bool _enabled, uint256 _amount) external authorized {
        swapEnabled = _enabled;
        swapThreshold = _amount;
    }

    function setTargetLiquidity(uint256 _target, uint256 _denominator) external authorized {
        targetLiquidity = _target;
        targetLiquidityDenominator = _denominator;
    }

    function setDistributionCriteria(uint256 _minPeriod, uint256 _minDistribution) external authorized {
        distributor.setDistributionCriteria(_minPeriod, _minDistribution);
    }

    function setDistributorSettings(uint256 gas) external authorized {
        require(gas < 750000);
        distributorGas = gas;
    }

    function getCirculatingSupply() public view returns (uint256) {
        return _totalSupply.sub(balanceOf(DEAD)).sub(balanceOf(ZERO));
    }

    function getLiquidityBacking(uint256 accuracy) public view returns (uint256) {
        return accuracy.mul(balanceOf(pair).mul(2)).div(getCirculatingSupply());
    }

    function isOverLiquified(uint256 target, uint256 accuracy) public view returns (bool) {
        return getLiquidityBacking(accuracy) > target;
    }

    event AutoLiquify(uint256 amountBNB, uint256 amountBOG);
}