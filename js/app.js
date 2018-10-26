/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */

let model = {
    init: function () {
        // Initiatialize students records
        if (!localStorage.students) {
            localStorage.students = JSON.stringify([]);
        }
    },
    addStudent: function (student) {
        let data = JSON.parse(localStorage.students);
        data.push(student);
        localStorage.students = JSON.stringify(data);
    },
    allStudents: function () {
        let data = JSON.parse(localStorage.students);
        return data;
    },
    singleStudent: function (studentID) {
        let data = JSON.parse(localStorage.students);
        let student = data[studentID];
        return student;
    },
    updateAllStudents: function (data) {
        localStorage.students = JSON.stringify(data);
    },
    updateSingleStudent: function (student) {
        localStorage.students[student.id] = JSON.stringify(student);
    },
}

let octopus = {
    init: function () {
        // MODEL
        localStorage.removeItem('students'); // clear local storage
        model.init(); // initialize
        this.addAllStudents(); // add all students
        // VIEW
        view.init(model.allStudents()); // initialize
        this.checkboxHandler(); // add click handlers
    },
    addAllStudents: function () {
        // adds all students to model
        let students = [
            { id: 0, name: 'Slappy the Frog', attended: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 1, name: 'Lilly the Lizard', attended: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 2, name: 'Paulrus the Walrus', attended: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 3, name: 'Gregory the Goat', attended: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 4, name: 'Adam the Anaconda', attended: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
        ];
        for (student of students) {
            model.addStudent(student);
        }
    },
    countAttended: function (student) {
        // counts # classes student has attended
        let totalAttended = 0;
        student.attended.forEach(record => {
            totalAttended += record;
        });
        return totalAttended;
    },
    checkboxHandler: function () {
        // adds handler to all checkboxes
        let students = model.allStudents();
        document.addEventListener('change', function (event) {
            let studentID = Number(event.target.getAttribute("studentid"));
            let dayID = Number(event.target.getAttribute("dayid"));
            if (event.target.checked) {
                students[studentID].attended[dayID] = 1;
            } else if (!event.target.checked) {
                students[studentID].attended[dayID] = 0;
            }
            model.updateAllStudents(students);
            octopus.updateTotalAttended();
        });
    },
    updateTotalAttended() {
        // Count total missed per student
        let students = model.allStudents();
        let missed = [];
        let totalAttended = [];
        for (student of students) {
            missed.push(octopus.countAttended(student));
        }
        // Update total missed column
        for (student of students) {
            totalAttended[student.id] = student.attended.reduce((a, b) => a + b, 0);
        }
        // Update final (sum) column
        view.updateTotals(totalAttended);
    }
}

let view = {
    init: function (students) {
        // Generate table
        let html;
        students.forEach(student => {
            html = '<tr class="student">';
            html += `<td class="name-col">${student.name}</td>`;
            student.attended.forEach( (record, index) => {
                html += `<td class="attend-col"><input type="checkbox" studentid="${student.id}" dayid="${index}"></td>`;
            });
            html += `<td class="att-col-value">0</td></tr>`;
            document.querySelector('tbody').insertAdjacentHTML('beforeend', html);
        });
    },
    updateTotals: function (totals) {
        let elements = document.getElementsByClassName('att-col-value');
        let i = 0;
        for (let element of elements) {
            element.innerText = totals[i];
            i++;
        };
    }
}

octopus.init();