/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */

let model = {
    init: function () {
        localStorage.students = JSON.stringify([]); // start fresh
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
    updateAttendance: function (studentID, dayID, record) {
        let data = JSON.parse(localStorage.students);
        data[studentID].attended[dayID] = record;
        localStorage.students = JSON.stringify(data);
    }
}

let octopus = {
    init: function () {
        // MODEL
        model.init(); // initialize
        this.addAllStudents(); // add all students
        // VIEW
        view.init(model.allStudents()); // initialize
        this.checkboxHandler(); // add checkbox handlers
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
        document.addEventListener('change', function (event) {
            let studentID = Number(event.target.getAttribute("studentid"));
            let dayID = Number(event.target.getAttribute("dayid"));
            if (event.target.checked) {
                model.updateAttendance(studentID, dayID, 1);
            } else if (!event.target.checked) {
                model.updateAttendance(studentID, dayID, 0);
            }
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
            student.attended.forEach((record, index) => {
                html += `<td class="attend-col"><input type="checkbox" studentid="${student.id}" dayid="${index}"></td>`;
            });
            html += `<td class="att-col-value">0</td></tr>`;
            document.querySelector('tbody').insertAdjacentHTML('beforeend', html);
        });
    },
    updateTotals: function (attendanceTotals) {
        let elements = document.getElementsByClassName('att-col-value');
        let i = 0;
        for (let element of elements) {
            element.innerText = attendanceTotals[i];
            i++;
        };
    }
}

octopus.init();