import type {PluginOption} from "vite";

type objRouterItem = {
  oldPath:string;
  newPath:string;
}

type devServerRouterItem = string | objRouterItem | [string,string];

export default (items:devServerRouterItem[]):PluginOption=>{
  return {
    name :"vite-plugin-devServer-router",
    configureServer(server){
      items.forEach(item=>{
        let oldPath:string,newPath:string;
        if(typeof item==="string"){
          oldPath = item;
          newPath=item[item.length-1]!=="/"?`${item}/`:item;
        }else if(Array.isArray(item)){
          oldPath = item[0];
          newPath = item[1];
        }else {
          oldPath = item.oldPath;
          newPath = item.newPath;
        }

        if(oldPath!==newPath){
          server.middlewares.use(oldPath,(req,res,next)=>{
            if(req.url==="/"&&(req.originalUrl&&req.originalUrl===oldPath)){
              res.writeHead(302,{
                Location:newPath
              })
              return res.end();
            }
            next();
          })
        }
      })
    }
  }
}