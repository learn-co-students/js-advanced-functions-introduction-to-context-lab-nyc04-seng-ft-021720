// Your code here
function createEmployeeRecord(array){

let firstName = array[0]
let familyName = array[1]
let title = array[2]
let payPerHour = array[3]

let object ={
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
}
return object
}


function createEmployeeRecords(aoa){
    // let newArray = []

    // aoa.forEach(employee =>{
    //     newArray.push(createEmployeeRecord(employee))
    // })

    return aoa.map(employee => createEmployeeRecord(employee))

}


function createTimeInEvent(employee, datestamp){
    let date = datestamp.split(' ')
    let time = parseInt(date[1])
    employee.timeInEvents.push({type: "TimeIn", hour: time, date: date[0]})
    return employee
}


function createTimeOutEvent(employee, datestamp){
    let date = datestamp.split(' ')
    let time = parseInt(date[1], 10)    
    employee.timeOutEvents.push({type: "TimeOut", hour: time, date: date[0]})
    return employee
}



function hoursWorkedOnDate(employee, datestamp){
    let timeIn = employee.timeInEvents.find(employee => employee.date === datestamp)
    let timeOut = employee.timeOutEvents.find(employee => employee.date === datestamp)
    let timeWorked = (timeOut.hour - timeIn.hour)/100
    return timeWorked
}

function wagesEarnedOnDate(employee, datestamp){
    let hoursWorked = hoursWorkedOnDate(employee, datestamp)
    let wage = employee.payPerHour * hoursWorked
    return wage   
}



function allWagesFor(employee){
    let allDates = employee.timeInEvents.map(employee => employee.date)
    let wage = allDates.reduce((acc, date) => acc + wagesEarnedOnDate(employee,date),0)
    return wage

}


function findEmployeeByFirstName(srcArray, firstName){
    let nameFound = srcArray.find(employee => employee.firstName === firstName)
    return nameFound
}


function calculatePayroll(srcArray){

    let totalWages = srcArray.reduce((accumulator, employee) => {
        return accumulator + allWagesFor(employee)
    },0)

    return totalWages

}