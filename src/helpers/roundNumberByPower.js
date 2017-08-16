module.exports = function roundNumberByPower (num, tensBaseToRoundTo) {
    return Math.ceil(num/tensBaseToRoundTo)*tensBaseToRoundTo
}
