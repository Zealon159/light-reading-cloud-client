/** 公共配置 */

// API接口前缀
export const baseApi = "/api";

/** 处理字符内容截取 */
export function handleContent(content, charLength){
    if(content == null){
        return "";
    }
    if(content.length > charLength){
        return content.substr(0,charLength)+"...";
    }else{
        return content;
    }
}