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
    }
}

let octopus = {
    init: function () {
        // Clear local storage
        localStorage.removeItem('students');
        // Initialize model
        model.init();
        // Add all students
        octopus.addAllStudents();
        // Initialize view
        view.init(model.allStudents());
    },
    addAllStudents: function () {
        let students = [
            { id: 1, name: 'Slappy the Frog', absences: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 2, name: 'Lilly the Lizard', absences: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 3, name: 'Paulrus the Walrus', absences: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 4, name: 'Gregory the Goat', absences: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 5, name: 'Adam the Anaconda', absences: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
        ];
        for (student of students) {
            model.addStudent(student);
        }
    },
    countMissing: function (student) {
        let totalAbsences = 0;
        student.absences.forEach(record => {
            totalAbsences += record;
        });
        return totalAbsences;
    },
    clickHandler: function () {
        // 
    },
    updateTotalMissed (student, totalMissed) {
        // Count total missed per student
        let students = model.allStudents();
        let missed = [];
        for (student of students) {
            missed.push(octopus.countMissing(student));
        }
        // Update total missed column
    }
}

let view = {
    init: function (students) {
        // Generate table
        let html;
        students.forEach(student => {
            html = '<tr class="student">';
            html += `<td class="name-col">${student.name}</td>`;
            student.absences.forEach(record => {
                html += `<td class="attend-col"><input type="checkbox"></td>`;
            });
            html += `<td class="missed-col">0</td></tr>`;
            document.querySelector('tbody').insertAdjacentHTML('beforeend', html);
        });
    }
}

octopus.init();