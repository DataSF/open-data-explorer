module.exports = function padDomainMax(maxValue){
  let domainMax
  if(maxValue > 0){
    if( 1 > maxValue){
      domainMax = maxValue * 2
    }
    else if ((1 < maxValue) && (maxValue < 5)){
      domainMax = maxValue * 1.3
    }
    else if ((5 < maxValue) && (maxValue < 100)){
      domainMax = maxValue * 1.10
    } else if ((100 < maxValue) && (maxValue < 1000)){
      domainMax = maxValue * 1.08
    }
    else  {
      domainMax = maxValue * 1.03
    }
  }
  return domainMax
}
