const students = [
  { id: 1, name: "Amina", year: 3, grades: [9, 8, 10], contact: { github: "amina-dev" } },
  { id: 2, name: "Emir", year: 2, grades: [6, 7, 7] },
  { id: 3, name: "Lejla", year: 3, grades: [10, 9, 9], contact: { github: "lejla-codes" } },
  { id: 4, name: "Tarik", year: 3, grades: [7, 6, 8] },
];

//const greet = (student) => `Hi ${student.name}, you are in year ${student.year}.`;
//students.forEach((student) => {
//  console.log(greet(student));
//});

const greet = ({ name, year }) => `Hello ${name}, you are in year ${year}.`;
students.forEach((student) => {
  console.log(greet(student));
});

const studentNames = students.map(({ name }) => name);
console.log(studentNames);

//Task7
const thirdYearNames = students.filter(({ year }) => year === 3).map(({ name }) => name);
console.log(thirdYearNames);

//Task8
const average = (grades) => {
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return sum / grades.length;
};
const studentsWithAverage = students.map((student) => ({ ...student, average: average(student.grades) }));

studentsWithAverage.forEach(({ name, average }) => {
  console.log(`${name}: ${average.toFixed(2)}`);
});

//Task9
const updatedStudents = students.map((student) => {
  if (student.id === 2) {
    return { ...student, year: 3 };
  }
  return student;
});

console.log(`Emir is in year ${students[1].year}`);
console.log(`Updated Emir is in year ${updatedStudents[1].year}`);

//Task10
students.forEach(({ name, contact }) => {
  const github = contact?.github ?? "no GitHub";
  console.log(`${name}: ${github}`);
});

//Task11
const loadUser = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const user = await response.json();
    console.log(`User ${id}: ${user.name}`);
  } catch (error) {
    console.log(`Could not load user ${id}`);
  }
};

loadUser(1);
