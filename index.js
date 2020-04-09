function createEmployeeRecord(empArray){
    let employee = {}
    employee.firstName = empArray[0]
    employee.familyName = empArray[1]
    employee.title = empArray[2]
    employee.payPerHour = empArray[3]
    employee.timeInEvents = []
    employee.timeOutEvents = []

    return employee
}

function createEmployeeRecords(employeeArrArr){
    const newEmployeeRecord = employeeArrArr.map(employeeArr => createEmployeeRecord(employeeArr))
    return newEmployeeRecord
}

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(" ")

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return employee

}

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(" ")
    
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return employee
}

function hoursWorkedOnDate(employee, date){
    let clockIn = employee.timeInEvents.find(function(e){
        return e.date === date
    })
    let clockOut = employee.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (clockOut.hour - clockIn.hour) / 100
}

function wagesEarnedOnDate(employee, date){
    let wagesEarned = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return parseFloat(wagesEarned.toString())
}

function allWagesFor(employee){
     let datesWorked = employee.timeInEvents.map(function(e){
         return e.date
     })

     let payment = datesWorked.reduce(function(total, d){
         return total + wagesEarnedOnDate(employee, d)
     }, 0)

     return payment
}

function findEmployeeByFirstName(employeeArray, firstName){
    return employeeArray.find(function(employee){
        return employee.firstName === firstName
    })
}

function calculatePayroll(empRecordArray){
    return empRecordArray.reduce(function(total, emp){
        return total + allWagesFor(emp)
    }, 0)
}