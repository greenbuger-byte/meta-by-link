import { parse } from 'node-html-parser';
import fetch from 'node-fetch';
async function read (body: ReadableStream<Uint8Array> | null): Promise<string> {
 return new Promise(async (resolve, reject) => {
    let head = '';
    if(Array.isArray(body)){
      for await (const chunk of body){
        head += chunk.toString();
        if(head.toString().split('</head>')[1] != undefined){
          head += `${head.toString().split('</head>')[0]}</head></html>`;
          resolve(head);
        }
      }
    }else{
      reject('<head></head>');
    }
  });
}
async function getParse(url: string) {
    const res: Response = await fetch(url);
    return await read(res.body);
}
const testUrl = async (url: string) => {
  const head = await getParse(url);
  const dom = parse(head);
  console.log(dom.querySelector('title')?.text);
}

testUrl('https://vk.com');