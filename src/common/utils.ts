const fs = require("node:fs");
const path = require("path");

// id	year	quarter	tag	createdAt	studentId	programId	id	school	currentClass	firstName	lastName	dob	address	phone	email	fatherLastName	country	fatherFirstName	fatherPhone	fatherEducation	fatherJob	motherLastName	motherFirstName	motherPhone	motherEducation	motherJob	noOfSisters	noOfBrothers	position	focus	favSubject	difficultSubject	careerChoice1	careerChoice2	yearJoined	tag	combo	id	program

const schools = [{ "id": "016b74d4-2e0d-4856-9649-59e41c509240", "school": "ADSS Maitama", "category": "senior", "program": "ascg" }, { "id": "021aeca2-b011-45df-a210-11b605c78fb8", "school": "GSS LifeCamp", "category": "senior", "program": "ascg" }, { "id": "082d027b-51ad-4ef1-8772-6ecbf5f96801", "school": "MJSS Maitama", "category": "junior", "program": "ascg" }, { "id": "0e9ccb20-42e6-4779-a9c6-a6dcd4da0cc5", "school": "JSS Lugbe FHA", "category": "junior", "program": "ascg" }, { "id": "0f929b7d-7d83-48bb-93af-ea8a991c7a9f", "school": "GSS Kuje", "category": "senior", "program": "ascg" }, { "id": "10e35577-1401-48d3-964e-eb56feb347e5", "school": "JSS Nyanya", "category": "junior", "program": "ascg" }, { "id": "1164cdea-1d1a-44e3-9e3d-c357b94fa864", "school": "GSS Nyanya", "category": "senior", "program": "ascg" }, { "id": "150b725b-e3a9-4afa-8e0b-cd509ef33c3a", "school": "GDSS Bwari", "category": "senior", "program": "ascg" }, { "id": "1a9df08a-d627-4b98-a0eb-86eb71c4e330", "school": "JSS Wuse Zone 3", "category": "junior", "program": "ascg" }, { "id": "1b5fe1f2-60f4-4f44-b37f-f5fbf1bf499d", "school": "JSS Karu", "category": "junior", "program": "ascg" }, { "id": "3349ec0d-6323-41a8-b421-d7e846f9e253", "school": "GSS Lugbe", "category": "senior", "program": "ascg" }, { "id": "3800347a-2343-49f5-b0df-8cbfe9697f2f", "school": "GSS Tudun Wada", "category": "senior", "program": "ascg" }, { "id": "41d21825-ea69-4f25-9846-69bccfe95dcc", "school": "GSS Jabi", "category": "senior", "program": "ascg" }, { "id": "45f8bbfe-378b-444a-9e94-063e0e68e099", "school": "GSS Idu-koro", "category": "senior", "program": "ascg" }, { "id": "4642f7e6-790b-49a6-80ab-787bffbadf90", "school": "GSS Kuchingoro", "category": "senior", "program": "ascg" }, { "id": "4a2c61b7-55c7-4dd3-b354-b43b22fa2eb6", "school": "GSS Airport", "category": "senior", "program": "ascg" }, { "id": "4c33514a-aa94-47bb-846d-483ff5a704ae", "school": "GSS Wuye", "category": "senior", "program": "ascg" }, { "id": "542a7619-a507-4bd5-b733-4d38acb5f122", "school": "MSS Maitama", "category": "senior", "program": "ascg" }, { "id": "562974cc-33da-4879-94b6-66c41714e8f0", "school": "GSS Mabushi", "category": "senior", "program": "ascg" }, { "id": "59588788-e999-492b-8da0-1ed9a35f8502", "school": "GSS Deidei", "category": "senior", "program": "ascg" }, { "id": "597abbf3-bea3-47a7-baa5-1f5e50d2aeca", "school": "GSS Gwarinpa", "category": "senior", "program": "ascg" }, { "id": "68c851c9-019f-483f-a0cd-a990cb129966", "school": "GSS Gui", "category": "senior", "program": "ascg" }, { "id": "797a6b38-0b0f-4398-aa59-fd08f6ebe646", "school": "GSS Kubwa", "category": "senior", "program": "ascg" }, { "id": "7bca478f-7395-49a0-8b70-20b3aef36578", "school": "GSS Garki", "category": "senior", "program": "ascg" }, { "id": "85788e81-85bb-49c4-aa05-75590c6b9123", "school": "ADSS Asokoro", "category": "senior", "program": "ascg" }, { "id": "a9d3ba22-3c0b-4eff-a9e1-9135fea8bc32", "school": "GSS Bwari", "category": "senior", "program": "ascg" }, { "id": "aa60791a-94d2-438f-a995-54f850bd192e", "school": "GSS Karu", "category": "senior", "program": "ascg" }, { "id": "acffe026-2291-429f-aa73-7d11300585ed", "school": "GSS Wuse 2", "category": "senior", "program": "ascg" }, { "id": "afb14044-8443-4158-a584-fbbd19c15429", "school": "GDSS Dutse", "category": "senior", "program": "ascg" }, { "id": "b09eea05-ade9-4de2-9fef-5e03cf3fc5a3", "school": "GSS Apo", "category": "senior", "program": "ascg" }, { "id": "b3f7b8a9-59ef-4dc4-85b0-9fbddb2fceee", "school": "JSS Kubwa", "category": "junior", "program": "ascg" }, { "id": "b41fb87f-3498-4448-b28b-d42fac4f9302", "school": "JSS Dutse-Alhaji", "category": "junior", "program": "ascg" }, { "id": "c74fdcee-50a2-45b6-bc1e-db72fa41b1ff", "school": "JSS Gwarinpa", "category": "junior", "program": "ascg" }, { "id": "c93e5499-ecdc-4019-bf42-c57a04a31653", "school": "GGSS Dutse", "category": "senior", "program": "ascg" }, { "id": "ce5049e1-f36c-4847-97d8-40bc706cf1fd", "school": "JSS Jabi", "category": "junior", "program": "ascg" }, { "id": "d0d49c73-6079-4a58-873e-ec08f5034fd3", "school": "GSS Jibi", "category": "senior", "program": "ascg" }, { "id": "d27897cb-1f74-4bd8-b4f6-4a7823c05dad", "school": "JSS Kado-kuchi", "category": "junior", "program": "ascg" }, { "id": "d40742a5-8c6d-4060-8b6a-2ed2c11284c4", "school": "GSS Kagini", "category": "senior", "program": "ascg" }, { "id": "da84edcf-b654-4723-8c5c-22863a9b1002", "school": "GSS Gwagwalada", "category": "senior", "program": "ascg" }, { "id": "def9da43-c1e1-4724-89de-67c2d9ceaf86", "school": "GSS Pyakasa", "category": "senior", "program": "ascg" }, { "id": "e4402107-2eda-464d-a955-1d0a7d8e0a0e", "school": "GDSS Karu", "category": "senior", "program": "ascg" }, { "id": "f053c246-0fe6-4dc6-81ca-9b22b44cb561", "school": "GSS Kubwa Phase 3", "category": "senior", "program": "ascg" }, { "id": "f5e47d18-4c74-4cc0-98a3-13d00f07b64c", "school": "GSS Wuse Zone 3", "category": "senior", "program": "ascg" }, { "id": "fbb7de44-7da2-48b9-a786-c90d1d398739", "school": "GSS Gosa", "category": "senior", "program": "ascg" }, { "id": "ff55d4eb-dfb5-4cb6-b2ca-c77f82011c88", "school": "GGSS Byazhin", "category": "senior", "program": "ascg" }]


//Target
// enum Result = {
//     firstName: string;
//     lastName: string;
//     dateOfBirth: string;
//     email: string;
//     phone: string;
//     school: string;
//     schoolId: string;
//     address: string;
//     country: string;
//     program: string;
//     programId: string;
//     yearJoined: number;
//     fatherFirstName: string;
//     fatherLastName: string;
//     fatherPhone: string;
//     fatherEducation: string;
//     fatherJob: string;
//     motherFirstName: string;
//     motherLastName: string;
//     motherPhone: string;
//     motherEducation: string;
//     motherJob: string;
//     numberOfSisters: number;
//     numberOfBrothers: number;
//     positionInFamily: string;
//     specialization: string;
//     favouriteSubject: string;
//     mostDifficultSubject: string;
//     careerChoice1: string;
//     careerChoice2: string;
//     year: number;
//     track: string;
//     trackId: string;
//     cohort: string;
//     type: string;
// }

//Convert 
function convertToProgram() {
    const rawData = fs.readFileSync(__dirname + '/data.csv', 'utf8').split('\n');
    // console.log(rawData);
    const headers = rawData[0].split(',');

    const mappedData = rawData.map((x, index) => {
        if (index > 0) {
            x = rawData[index].split(',')
            let obj = {}
            for (i = 0; i < headers.length; i++) {
                obj[headers[i]] = x[i]
            }
            return obj;
        }
    })

    console.log(mappedData);

}



convertToProgram();