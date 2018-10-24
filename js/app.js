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
        // Initialize attendance records
        if (!localStorage.attendance) {
            localStorage.attendance = JSON.stringify([]);
        }
    },
    addStudent: function (student) {
        let data = JSON.parse(localStorage.students);
        data.push(student);
        localStorage.students = JSON.stringify(data);
    },
    addAttendance: function (attendanceRecord) {
        let data = JSON.parse(localStorage.attendance);
        data.push(attendanceRecord);
        localStorage.attendance = JSON.stringify(data);
    }
}

let octopus = {
    init: function () {
        // Initialize model
        model.init();
        // Add students
        let students = [
            { id: 1, name: 'Slappy the Frog' },
            { id: 2, name: 'Lilly the Lizard' },
            { id: 3, name: 'Paulrus the Walrus' },
            { id: 4, name: 'Gregory the Goat' },
            { id: 5, name: 'Adam the Anaconda' }
        ];
        for (student of students) {
            model.addStudent(student);
        }
        // Add attendance records
        let attendance = [
            { id: 1, absences: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 2, absences: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 3, absences: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 4, absences: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { id: 5, absences: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        ];
        for (record of attendance) {
            model.addAttendance(record);
        }
    }
}

let view = {
    init: function () {
        console.log(hi);
    }
}

octopus.init();



//     (function () {
//         if (!localStorage.attendance) {
//             console.log('Creating attendance records...');
//             function getRandom() {
//                 return (Math.random() >= 0.5);
//             }

//             var nameColumns = $('tbody .name-col'),
//                 attendance = {};

//             nameColumns.each(function () {
//                 var name = this.innerText;
//                 attendance[name] = [];

//                 for (var i = 0; i <= 11; i++) {
//                     attendance[name].push(getRandom());
//                 }
//             });

//             localStorage.attendance = JSON.stringify(attendance);
//         }
//     }());


// /* STUDENT APPLICATION */
// $(function () {
//     var attendance = JSON.parse(localStorage.attendance),
//         $allMissed = $('tbody .missed-col'),
//         $allCheckboxes = $('tbody input');

//     // Count a student's missed days
//     function countMissing() {
//         $allMissed.each(function () {
//             var studentRow = $(this).parent('tr'),
//                 dayChecks = $(studentRow).children('td').children('input'),
//                 numMissed = 0;

//             dayChecks.each(function () {
//                 if (!$(this).prop('checked')) {
//                     numMissed++;
//                 }
//             });

//             $(this).text(numMissed);
//         });
//     }

//     // Check boxes, based on attendace records
//     $.each(attendance, function (name, days) {
//         var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
//             dayChecks = $(studentRow).children('.attend-col').children('input');

//         dayChecks.each(function (i) {
//             $(this).prop('checked', days[i]);
//         });
//     });

//     // When a checkbox is clicked, update localStorage
//     $allCheckboxes.on('click', function () {
//         var studentRows = $('tbody .student'),
//             newAttendance = {};

//         studentRows.each(function () {
//             var name = $(this).children('.name-col').text(),
//                 $allCheckboxes = $(this).children('td').children('input');

//             newAttendance[name] = [];

//             $allCheckboxes.each(function () {
//                 newAttendance[name].push($(this).prop('checked'));
//             });
//         });

//         countMissing();
//         localStorage.attendance = JSON.stringify(newAttendance);
//     });

//     countMissing();
// }());
