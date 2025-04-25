import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { students } from './student';

function getRandom(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

(async function seed() {
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
