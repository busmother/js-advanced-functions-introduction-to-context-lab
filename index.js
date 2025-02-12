const createEmployeeRecord = function(row){
    return { 
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function (ray){
    return ray.map(employee => createEmployeeRecord(employee));
}

const createTimeInEvent = function (employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

const createTimeOutEvent = function (employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

const hoursWorkedOnDate = function (employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function (employee, soughtDate){
    return (employee.payPerHour * hoursWorkedOnDate(employee, soughtDate))
}

const allWagesFor = function (employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){ //what is memo? it looks like wages earned maybe?
        return memo + wagesEarnedOnDate(employee, d)
    }, 0) // what's this 0?
    
    return payable
    
}

const findEmployeeByFirstName = function(ray, firstName) {
    return ray.find(function(rec){ //how does it find
        return rec.firstName == firstName
    })
}

const calculatePayroll = function (arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0) // what's this 0?
}