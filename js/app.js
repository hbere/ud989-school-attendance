// 10/26/18
// app.js

let model = {
    init: function () {
        let students = [
            { id: 0, name: 'Slappy the Frog', attended: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 1, name: 'Lilly the Lizard', attended: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 2, name: 'Paulrus the Walrus', attended: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 3, name: 'Gregory the Goat', attended: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 4, name: 'Adam the Anaconda', attended: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
        ];
        localStorage.students = JSON.stringify(students);
    },
    getStudents: function () {
        return JSON.parse(localStorage.students);
    },
    updateStudents: function (students) {
        localStorage.students = JSON.stringify(students);
    },
    getAttendance: function () {
        let students = JSON.parse(localStorage.students);
        let totalAttended = [];
        for (student of students) {
            totalAttended.push(student.attended.reduce((a, b) => a + b));
        }
        return totalAttended;
    }
}

let octopus = {
    init: function () {
        model.init();
        view.init(model.getStudents());
    },
    updateAttendance: function (studentID, dayID, record) {
        let students = model.getStudents();
        students[studentID].attended[dayID] = record;
        model.updateStudents(students);
    },
    updateTotalAttended() {
        let totalAttended = model.getAttendance();
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
        // Add checkbox handler
        document.addEventListener('change', function (event) {
            let studentID = Number(event.target.getAttribute("studentid"));
            let dayID = Number(event.target.getAttribute("dayid"));
            if (event.target.checked) {
                octopus.updateAttendance(studentID, dayID, 1);
            } else {
                octopus.updateAttendance(studentID, dayID, 0);
            }
            octopus.updateTotalAttended();
        });
    },
    updateTotals: function (attendanceTotals) {
        // Update attendance column
        let elements = document.getElementsByClassName('att-col-value');
        attendanceTotals.forEach((value, index) => {
            elements[index].innerText = value;
        });
    }
}

octopus.init();