import inquirer from "inquirer";

//Define a student class

class Students {
    static counter = 10000;
    id : number;
    name: string;
    courses: string[];
    balance: number;

constructor(name : string){
    this.id = Students.counter++;
    this.name = name;
    this.courses = [];
    this.balance = 200;
}
//Method to enroll in a course.
enroll_course(course : string){
    this.courses.push(course)
}

//Method to view a a balance
view_balance(){
    console.log(`Balance for ${this.name}: $${this.balance}`);
}

//Method to pay fee amount of a student
pay_feeAmount(amount : number){
    this.balance -= amount
    console.log(`$${amount} fee paid of succesfully by ${this.name}}`);
    console.log(`Remaining balance: $${this.balance}`);
}
//Method to show status of a student

show_status(){
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Course: ${this.courses}`);
    console.log(`Balance: ${this.balance}`);
}
}
//Defining a student manager class to manage students

class studentManager {
    student: Students[]

    constructor(){
    this.student = [];

}
//Method to add a new student

add_student(name :string){
   let Student = new Students(name);
   this.student.push(Student);
   console.log(`student ${name} added successfully with ID: ${Student.id}`);
}
// Method to enroll a student in a course
enroll_student(student_id: number, course: string){
let student_found = this.find_students(student_id);
    if(student_found){
        student_found.enroll_course(course);
        console.log(`${student_found.name} enrolled in ${course} successfully. `)

    }
}
//Method to view a student balance

view_student_balance (student_id: number){
    let student_found = this.find_students(student_id);
    if(student_found){
        student_found.view_balance();
    }
    else{
        console.log("Student not found. Please enter a correct student ID.")
    }
}
//Method to pay student fee---
pay_student_fee(student_id:number, amount: number){
    let student_found = this.find_students(student_id);
    if(student_found){
        student_found.pay_feeAmount(amount);
    }
    else{
        console.log("Student not found. Please enter a correct student ID.")
    }
}
//Method to display student status
show_student_status(student_id:number){
    let student_found = this.find_students(student_id);
    if( student_found){
        student_found.show_status();
    }
}
//Method to find a student by student_id

find_students(student_id: number){
    return this.student.find(stdnt => stdnt.id === student_id);
}
}

//Main function to run the program
async function main(){
    console.log("\n\nWelcome to Galaxy_junction's student management system");
    console.log("-" .repeat(60))
    let student_manager = new studentManager();

    //while loop to keep program running
    
    while(true){
        let choice = await inquirer.prompt([
            {
                name: "option",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Student Fee",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);
        switch(choice.option){
            case "Add Student":
            let name_input = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter a student name",
                }
            ]);
            student_manager.add_student(name_input.name);
            break; 
            
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    }
                    ,
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name",

                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;

                case"View Student Balance":
                let balance_input =await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;

            case "Pay Student Fee":
                let fee_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter the student ID.",
                    }
                    ,
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay."
                    }
                ]);
                student_manager.pay_student_fee(fee_input.student_id, fee_input.amount);
                break;

            case "Show Student Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;

            case "Exit":
                console.log("Exiting....");
                process.exit();
        }


        }


    }
    //Calling main function
    main();

