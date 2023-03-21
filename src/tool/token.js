const token = "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtMWMzNWUwZWI5ZTU0NDEzYTlmNGY0Mzc5N2VjY2I1NWEvMjZkMjBmLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE2NzkzMTcwNjQsImV4cCI6MTY3OTMyNDI2NCwibmJmIjoxNjc5MzE3MDU5LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtMWMzNWUwZWI5ZTU0NDEzYTlmNGY0Mzc5N2VjY2I1NWEiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6IiIsImlkIjoiIiwiYXZhdGFyIjoiIiwiZW1haWwiOiIifX0sInJvb20iOiIqIn0.AaN6y_wD9I-FC7qlhaFrSO_Em49ytLgj7kJkwjYJwW-5vl-TsA84FUASfF_Vy2dFPkZMpMSXAgRWBqddhCHRXbj_1u1mmC5cVzNgImnFsZDuIesIZOOyQpWSgu7Edi71W9VxGpni3STR2_e9DnxU2k5c4AKI0MavsP6UgvDhHZMJl7EN1zP7rDB4beUvDmyZ2lrI-MbhZjck1LYM39aYfy7Jn9ZKd4Krt00PrdWai1m0TdJGHoB9WO-V1T2V5Gp9WDaU2NbFoEShMesfDr8wILUZJ_AM56RxdxiSACq4aqoP3uVQIMSAQ8375VMvPmqpjZzhQRU0C9EFL6ViBvWofA"

export default token;

// var jsonwebtoken = require('jsonwebtoken');
// var uuid = require('uuid-random');

/**
 * Function generates a JaaS JWT.
 */
// const generate = (privateKey, { id, name, email, avatar, appId, kid }) => {
//   const now = new Date()
//   const jwt = jsonwebtoken.sign({
//     aud: 'jitsi',
//     context: {
//       user: {
//         id,
//         name,
//         avatar,
//         email: email,
//         moderator: 'true'
//       },
//       features: {
//         livestreaming: 'true',
//         recording: 'true',
//         transcription: 'true',
//         "outbound-call": 'true'
//       }
//     },
//     iss: 'chat',
//     room: '*',
//     sub: appId,
//     exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
//     nbf: (Math.round((new Date).getTime() / 1000) - 10)
//   }, privateKey, { algorithm: 'RS256', header: { kid } })
//   return jwt;
// }

// /**
//  * Generate a new JWT.
//  */
// const t = generate('my private key', {
//     id: uuid(),
//     name: "my user name",
//     email: "my user email",
//     avatar: "my avatar url",
//     appId: "my AppID", // Your AppID ( previously tenant )
//     kid: "my api key"
// });

// console.log(token);



