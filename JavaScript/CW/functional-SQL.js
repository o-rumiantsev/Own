'use strict';

const query = () => {
  const q = {};

  q.jsql = {
    filter: []
  };
  q.result = [];

  q.jsql.fetch = () => {
    if (!q.source) return;
    else q.result = q.source;
  }

  const methods = {
    select: (fn) => {
      if (q.jsql.select)
        q.jsql.error = new Error('Duplicate SELECT');
      q.jsql.select = true;

      q.jsql.fetch = () => {
        if (!q.source) return;
        if (fn) q.result = q.source.map(fn);
        else q.result = q.source;
      }

      return methods;
    },

    from: (...sources) => {
      if (q.jsql.from)
        q.jsql.error = new Error('Duplicate FROM');

      if (sources.length === 1) q.jsql.from = () => {
        q.source = sources[0];
      };
      else {
        q.jsql.join = () => {
          const composition = [];
          let k = 0;

          const multiply = (items, ...sources) => {
            sources[k].forEach((item) => {
              items.push(item);
              ++k;
              if (k < sources.length) {
                multiply(items, ...sources);
              } else {
                composition.push([...items]);
              }
              items.pop();
              --k;
            })
          }

          multiply([], ...sources);
          q.source = composition;
        }
      }

      return methods;
    },

    where: (...fns) => {
      q.jsql.filter.push(() => {
        let union = [];
        fns.forEach(fn => {
          union = union.concat(q.source.filter(fn));
        });
        q.source = union;
      });

      return methods;
    },

    having: (fn) => {
      q.jsql.getGroup = () => {
        q.source = q.source.filter(fn);
      }

      return methods;
    },

    groupBy: (...fns) => {
      if (q.jsql.groupify)
        q.jsql.error = new Error('Duplicate GROUPBY');

      let counter = 0;
      const groupSource = (source) => {
        q.groups = new Set();
        source.forEach(
          item => q.groups.add(fns[counter](item))
        );

        const src = source;
        source = [];

        q.groups.forEach(group => source.push(
          [group, src.filter(item => fns[counter](item) === group)]
        ));

        if (++counter !== fns.length) source = source.map(
          group => [group[0], groupSource(group.slice(1)[0])]
        );

        --counter;
        return source;
      }

      q.jsql.groupify = () => {
        q.source = groupSource(q.source);
      }

      return methods;
    },

    orderBy: (fn) => {
      if (q.jsql.orderify)
        q.jsql.error = new Error('Duplicate ORDERBY');

      q.jsql.orderify = () => {
        const source = [...q.source];
        q.source = source.sort(fn);
      };

      return methods;
    },

    execute: () => {
      if (q.jsql.error) throw q.jsql.error;

      if (q.jsql.from) q.jsql.from();
      if (q.jsql.join) q.jsql.join();
      if (q.jsql.filter.length > 0) q.jsql.filter.forEach(fn => fn());
      if (q.jsql.groupify) q.jsql.groupify();
      if (q.jsql.getGroup) q.jsql.getGroup();
      if (q.jsql.orderify) q.jsql.orderify();
      q.jsql.fetch();

      return q.result;
    }
  }

  return methods;
}

// Test
//
// const persons = [
//   {name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married'},
//   {name: 'Michael', profession: 'teacher', age: 50, maritalStatus: 'single'},
//   {name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married'},
//   {name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'married'},
//   {name: 'Rose', profession: 'scientific', age: 50, maritalStatus: 'married'},
//   {name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'single'},
//   {name: 'Anna', profession: 'politician', age: 50, maritalStatus: 'married'}
// ];
//
// const pers = query()
//   .where(p => p.profession === 'teacher')
//   .from(persons)
//   .select(p => p.name)
//   .execute();
//
// console.dir(pers);
//
// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
//
// query().select().from(numbers).orderBy((a, b) => b - a).execute();
// const nums = query()
//   .select()
//   .from(numbers)
//   .execute();
//
//   console.log(nums);
//
const teachers = [
  { teacherId: '1', teacherName: 'Peter' },
  { teacherId: '2', teacherName: 'Anna' }
];

const students = [
  { studentName: 'Michael', tutor: '1' },
  { studentName: 'Rose', tutor: '2' }
];

const teacherJoin = (join) => (
  join[0].teacherId === join[1].tutor
);

const student = (join) => (
  { studentName: join[1].studentName, teacherName: join[0].teacherName }
);

console.log(query().from(teachers, students).execute());
console.log('\n-----------------------------------------------\n');

const join = query()
  .select(student)
  .from(teachers, students)
  .where(teacherJoin)
  .execute();

console.log(join);
