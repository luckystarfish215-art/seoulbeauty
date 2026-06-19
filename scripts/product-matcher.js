
// SeoulBeauty Phase 3.2
const products = require("../data/products.json");
function matchProduct(videoTitle) {
 const title=(videoTitle||"").toLowerCase();
 let best=null,bestScore=0;
 for (const product of products){
   const words=product.name.toLowerCase().split(/\s+/).filter(w=>w.length>3);
   const score=words.filter(w=>title.includes(w)).length;
   if(title.includes(product.name.toLowerCase())) return product;
   if(score>bestScore){best=product;bestScore=score;}
 }
 return bestScore>=2?best:null;
}
module.exports={matchProduct};
