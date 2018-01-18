const schedule = (callback) => {
  const { URL } = require('url');
  const https = require('https');
  const metasync = require('metasync');

  const URL_API_TEACHERS = 'https://api.rozklad.org.ua/v2/teachers/';
  const ITEMS_PER_PAGE = 100;

  const teachersSubjects = new Map();
  const sequence = [];

  getTeachers(0);

  function getTeachers(offset) {
    const url = new URL(URL_API_TEACHERS);
    url.searchParams.set('filter', `{"offset":${offset}}`);

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.log('fuck');
        // application.log.error(
        //   `In lib schedule getTeachers ${url.href}: ${res.statusMessage}`
        // );
        callback(res.statusMessage);
        return;
      }

      const rawData = [];

      res.on('data', (data) => rawData.push(data));
      res.on('end', () => {
        console.log('ok');
        const parsed = JSON.parse(rawData.join(''));
        const teachers = [];

        parsed.data.forEach(
          teacher => teachers.push(teacher.teacher_name)
        );

        const parallel = teachers.reduce((arr, teacher) => {
          arr[0].push((data, callback) => getGroups(teacher, callback));
          return arr;
        }, [[]]);
        sequence.push(parallel);

        offset += ITEMS_PER_PAGE;
        if (teachers.length === ITEMS_PER_PAGE) getTeachers(offset);
        else metasync(sequence)({}, () => callback(teachersSubjects));
      });
    });
  }

  function getGroups(teacher, callback) {
    const url = new URL(URL_API_TEACHERS);
    url.pathname += `/${teacher}/lessons`;
    console.log(teacher);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        // application.log.error(
        //   `In lib schedule getGroups ${url.href}: ${res.statusMessage}`
        // );
        callback(null);
        return;
      }

      const rawData = [];

      res.on('data', (data) => rawData.push(data));
      res.on('end', () => {
        const parsed = JSON.parse(rawData.join(''));
        const subjects = new Map();
        addNewGroups(subjects, parsed.data);
        teachersSubjects.set(teacher, subjects);
        callback(null);
      });
    });
  }

  function addNewGroups(subjects, data) {
    data.forEach((lesson) => {
      const subject = lesson.lesson_full_name;
      let groups = subjects.get(subject);

      if (!groups) {
        groups = new Set();
        subjects.set(subject, groups);
      }

      lesson.groups.forEach(
        groupName => groups.add(groupName.group_full_name)
      );
      console.clear();
      console.log(teachersSubjects.size);
    });
  }
};

let map1 = null;

schedule((s) => {
  map1 = s;
  schedule((s) => {
    setTimeout(() => console.log(map1.size, s.size), 1000);
  });
});
