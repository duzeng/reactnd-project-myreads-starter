// Array.prototype.groupBy = function(prop) {
export function groupBy(array,prop) {
    return array.reduce(function(groups, item) {
        let val = ''
        if (Array.isArray(prop)) {
            val = prop.reduce(function(str, k) {
                if (str) {
                    return `${str},${item[k]}`
                } else {
                    return item[k]
                }
            }, '')
        } else {
            val = item[prop]
        }

        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
    }, {})
}