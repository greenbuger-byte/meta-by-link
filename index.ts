import {parse} from 'node-html-parser';
import fetch, {Response} from 'node-fetch';
import parseRules from './parseRules';

export type MetaData = {
    url: string;
    title: string;
}
async function read (body: ReadableStream<any> | null): Promise<string> {
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
      reject('<head />');
    }
  });
}
async function getParse(url: string) {
    const res: Response = await fetch(url);
    return await read(res.body as unknown as ReadableStream);
}
const testUrl = async (url: string) => {
  const metaData: Record<keyof typeof parseRules, string | null> = {
      title: ''
  }
  const head = await getParse(url);
  console.log(head);
  const dom = parse(head);
  for(const prop of Object.keys(parseRules)) {
      if(prop){
          for(const rule of parseRules[prop as keyof typeof parseRules]) {
              const [query, searchRule] = rule;
              console.log('sdfdsf');
              const foundedElement = dom.querySelector(query);
              if(foundedElement){
                  metaData[prop as keyof typeof metaData] = searchRule(foundedElement as unknown as HTMLElement);
              }
          }
      }
  }
  console.log(dom.querySelector('title')?.text);
  return metaData;
}

testUrl('https://vk.com').then(r => console.log(r));