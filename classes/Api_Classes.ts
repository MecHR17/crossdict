import { FreeDictionaryAPI_link } from "@/constants/apiLinks";
import Single_Definition from "./Single_Definition"

abstract class Dict_API {
    api_link: string;
    constructor(link:string){
        this.api_link = link;
    }
    abstract GetDefinition(word:string): Promise<Single_Definition[]>;
}

class FreeDictionaryAPI extends Dict_API {
    GetDefinition(word: string){
        return new Promise<Single_Definition[]>((resolve,reject)=>{
            var defs:Single_Definition[] = [];
            var error_message:any = null;
            fetch(this.api_link.concat(word.toString()))
            .then(response => response.json())
            .then(json => json[0].meanings)
            .then(meanings => {
              meanings.forEach((element: { partOfSpeech:any,definitions: { definition: any; }[]; }) => {
                  element.definitions.forEach((one_definition:any) => {
                    defs.push(new Single_Definition(element.partOfSpeech,one_definition.definition));
                  });
              });
              resolve(defs);
            }).catch((error)=>{
                reject(error);
            });
        });
    }
}

export const free_dictionary_api = new FreeDictionaryAPI(FreeDictionaryAPI_link);