import _ from 'lodash';

const locationFilter = {
    filter: (locations, mapBounds, filters) => {
        let result = []
        
        locations.map((location) => {
            let filteredLocation = Object.assign({}, location);            
            let isInMapBounds = positionIsInBounds(filteredLocation.position, mapBounds);  
            
            if (isInMapBounds) { 
                //if both days and times are empty we can just push everything -- no need to filter
                if (isInMapBounds && (filters.days.length > 0 || filters.time.value !== "any")) {                           
                    filteredLocation.specials = filterSpecials(filteredLocation.specials, filters);
                }
                if (filteredLocation.specials.length > 0) {
                    result.push(filteredLocation);
                }
            }
        });

        return result;
    }
}  

function positionIsInBounds(position, bounds) {
    if (position.latitude < bounds.ne.lat() && 
        position.latitude > bounds.sw.lat() &&
        position.longitude > bounds.sw.lng() &&
        position.longitude < bounds.ne.lng()) {
            return true;
        }
    return false;    
}

function positionIsInPoly(point, poly) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        var xi = poly[i][0], yi = poly[i][1];
        var xj = poly[j][0], yj = poly[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

function filterSpecials(specials, filters) {
    let result = [];

    specials.map((special) => {
        //first check for specials with matching days
        if (filters.days.length === 0 || _.intersection(filters.days, special.days).length > 0) { 
            let hasMatchingTime = false;        
            
            if (filters.time.value === "any") {
                hasMatchingTime = true;
            } else {
                //then check for specials with matching times
                special.times.map((time) => {
                    let filterStartTime = filters.time.start * 100;
                    let filterEndTime = filters.time.end * 100;
                    let specialStartTime = parseInt(time.start.replace(':',''), 10);
                    let specialEndTime = parseInt(time.end.replace(':',''), 10);

                    if (specialEndTime < specialStartTime) { //crosses into next day
                        specialEndTime = specialEndTime + 2400;
                    }
                    
                    if (specialStartTime < filterEndTime && specialEndTime > filterStartTime) {
                        hasMatchingTime = true;
                    }
                });
            }
            if (hasMatchingTime) {
                result.push(special);
            }            
        }
    });
    return result;
}


export default locationFilter;