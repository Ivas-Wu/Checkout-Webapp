var sort_property = null

function compare (a, b) {
    if (!(isNaN(a[sort_property]) && isNaN(b[sort_property]))){
        a[sort_property] = parseFloat(a[sort_property])
        b[sort_property] = parseFloat(b[sort_property])
        //console.log(aNum, " ", bNum)
    }

    if (a[sort_property] < b[sort_property]) {
        //console.log(a[sort_property], ' < ',  b[sort_property])
        return 1
    } else if (a[sort_property] > b[sort_property]) {
        //console.log(a[sort_property], ' > ',  b[sort_property])
        return -1
    } else {
        return 0
    }
}

export const SortByProperty = (list, property) => {
    sort_property = property
    console.log("sort property:" , property)
    return list.sort(compare).reverse()
}

