import { Logger } from '@nestjs/common';
import { PrismaClient } from './client';

function getRandom(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

(async function seed() {
  const students = [
    {
      prefix: 'เด็กชาย',
      firstName: 'ภูมิใจ',
      lastName: 'ทองสุข',
      gender: 'ชาย',
      birthDate: new Date('2012-06-15'),
    },
    {
      prefix: 'เด็กหญิง',
      firstName: 'ชลธิชา',
      lastName: 'ใจดี',
      gender: 'หญิง',
      birthDate: new Date('2013-02-10'),
    },
    {
      prefix: 'เด็กชาย',
      firstName: 'นภัทร',
      lastName: 'เกษมสุข',
      gender: 'ชาย',
      birthDate: new Date('2011-11-05'),
    },
    {
      prefix: 'เด็กหญิง',
      firstName: 'สุภาวดี',
      lastName: 'มีศิลป์',
      gender: 'หญิง',
      birthDate: new Date('2012-07-25'),
    },
    {
      prefix: 'เด็กชาย',
      firstName: 'ธนวัฒน์',
      lastName: 'อรุณโรจน์',
      gender: 'ชาย',
      birthDate: new Date('2013-03-17'),
    },
    {
      prefix: 'เด็กหญิง',
      firstName: 'ขวัญฤดี',
      lastName: 'คำดี',
      gender: 'หญิง',
      birthDate: new Date('2012-08-01'),
    },
    {
      prefix: 'เด็กชาย',
      firstName: 'พีรพัฒน์',
      lastName: 'สุขใจ',
      gender: 'ชาย',
      birthDate: new Date('2011-09-12'),
    },
    {
      prefix: 'เด็กหญิง',
      firstName: 'วราภรณ์',
      lastName: 'ตั้งมั่น',
      gender: 'หญิง',
      birthDate: new Date('2013-12-22'),
    },
    {
      prefix: 'เด็กชาย',
      firstName: 'ณัฐวุฒิ',
      lastName: 'ชัยมงคล',
      gender: 'ชาย',
      birthDate: new Date('2012-05-30'),
    },
    {
      prefix: 'เด็กหญิง',
      firstName: 'พัชรี',
      lastName: 'ทองแท้',
      gender: 'หญิง',
      birthDate: new Date('2013-01-19'),
    },
    {
      prefix: 'เด็กชาย',
      firstName: 'กิตติศักดิ์',
      lastName: 'ใจบุญ',
      gender: 'ชาย',
      birthDate: new Date('2011-10-08'),
    },
    {
      prefix: 'เด็กหญิง',
      firstName: 'ปาณิสรา',
      lastName: 'วงศ์ดี',
      gender: 'หญิง',
      birthDate: new Date('2012-04-14'),
    },
    {
      prefix: 'เด็กชาย',
      firstName: 'ศิริพงษ์',
      lastName: 'บวรสุข',
      gender: 'ชาย',
      birthDate: new Date('2013-07-03'),
    },
    {
      prefix: 'เด็กหญิง',
      firstName: 'กมลวรรณ',
      lastName: 'ประเสริฐ',
      gender: 'หญิง',
      birthDate: new Date('2012-10-20'),
    },
    {
      prefix: 'เด็กชาย',
      firstName: 'อภิวัฒน์',
      lastName: 'รุ่งเรือง',
      gender: 'ชาย',
      birthDate: new Date('2011-12-01'),
    },
    {
      prefix: 'เด็กหญิง',
      firstName: 'จิราภา',
      lastName: 'ธารารัตน์',
      gender: 'หญิง',
      birthDate: new Date('2013-06-11'),
    },
    {
      prefix: 'เด็กชาย',
      firstName: 'วรชัย',
      lastName: 'เกษตรพัฒนา',
      gender: 'ชาย',
      birthDate: new Date('2012-01-27'),
    },
    {
      prefix: 'เด็กหญิง',
      firstName: 'ปิยะดา',
      lastName: 'นาคิน',
      gender: 'หญิง',
      birthDate: new Date('2013-09-29'),
    },
    {
      prefix: 'เด็กชาย',
      firstName: 'ชยพล',
      lastName: 'ลิ้มธรรม',
      gender: 'ชาย',
      birthDate: new Date('2012-02-06'),
    },
    {
      prefix: 'เด็กหญิง',
      firstName: 'สุชาดา',
      lastName: 'เพ็ญสุข',
      gender: 'หญิง',
      birthDate: new Date('2013-05-18'),
    },
  ];

  const teachers = [
    { firstName: 'สมชาย', lastName: 'ทองดี', email: 'somchai.td@example.com' },
    {
      firstName: 'วราภรณ์',
      lastName: 'ใจงาม',
      email: 'waraporn.jn@example.com',
    },
    {
      firstName: 'ณัฐวุฒิ',
      lastName: 'เกษมสุข',
      email: 'nattawut.ks@example.com',
    },
    {
      firstName: 'ปรียานุช',
      lastName: 'มีศิลป์',
      email: 'preeyanuch.ms@example.com',
    },
    {
      firstName: 'ธนากร',
      lastName: 'จันทร์เจ้า',
      email: 'thanakorn.cj@example.com',
    },
    { firstName: 'อรุณี', lastName: 'สุขใจ', email: 'arunee.sj@example.com' },
    {
      firstName: 'กิตติศักดิ์',
      lastName: 'ตั้งใจ',
      email: 'kittisak.tj@example.com',
    },
    {
      firstName: 'จิราภรณ์',
      lastName: 'ทองแท้',
      email: 'jiraporn.tt@example.com',
    },
    {
      firstName: 'พีระพล',
      lastName: 'เพียรดี',
      email: 'peeraphon.pd@example.com',
    },
    {
      firstName: 'สุภาพร',
      lastName: 'บัวเงิน',
      email: 'supaporn.bg@example.com',
    },
    {
      firstName: 'วีระศักดิ์',
      lastName: 'วงศ์ดี',
      email: 'veerasak.wd@example.com',
    },
    { firstName: 'ปิยะดา', lastName: 'แก้วใส', email: 'piyada.ks@example.com' },
    {
      firstName: 'วิเชียร',
      lastName: 'รุ่งเรือง',
      email: 'wichian.rr@example.com',
    },
    {
      firstName: 'มัลลิกา',
      lastName: 'วรรณดี',
      email: 'mallika.wd@example.com',
    },
    {
      firstName: 'ธวัชชัย',
      lastName: 'เกษตรพัฒนา',
      email: 'tawatchai.kp@example.com',
    },
  ];

  try {
    const newPrismaClient = new PrismaClient();
    await newPrismaClient.$connect();
    let findClassLevel = await newPrismaClient.classLevel.findMany();
    if (findClassLevel.length === 0) {
      await newPrismaClient.classLevel.createMany({
        data: [
          { name: 'ป.1' },
          { name: 'ป.2' },
          { name: 'ป.3' },
          { name: 'ป.4' },
          { name: 'ป.5' },
          { name: 'ป.6' },
          { name: 'ม.1' },
          { name: 'ม.2' },
          { name: 'ม.3' },
          { name: 'ม.4' },
          { name: 'ม.5' },
          { name: 'ม.6' },
        ],
      });
      findClassLevel = await newPrismaClient.classLevel.findMany();
    }
    const findStudents = await newPrismaClient.student.findMany();
    if (findStudents.length === 0) {
      await newPrismaClient.student.createMany({
        data: students.map((student) => {
          const ramdomLevelId =
            findClassLevel[getRandom(0, findClassLevel.length - 1)].id;
          return {
            ...student,
            classLevelId: ramdomLevelId,
          };
        }),
      });
    }

    const findTeachers = await newPrismaClient.teacher.findMany();
    if (findTeachers.length === 0) {
      await newPrismaClient.teacher.createMany({
        data: teachers,
      });
    }
    console.log('Seed data successfully ');
  } catch (e) {
    Logger.error('Error connecting to DB', e);
  }
})();
