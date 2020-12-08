'use strict'
const path = require('path');
const index = require('../index');
const fs = require('fs');

let gen = {
  convertToLocalDateTime : function(val){
    try 
    {
      let d = new Date(val);        
      let currDateTime = d.toLocaleDateString()+' '+d.toLocaleTimeString();
      return currDateTime;      
    } catch (error) {
      gen.writelog('error',`[general][convertToLocalDateTime] Exception: ${error.message}`);
    }        
  },  
  getCurrentDateTime : function(){
    try 
    {
      let d = new Date();        
      let currDateTime = d.toLocaleDateString()+' '+d.toLocaleTimeString();
      return currDateTime;      
    } catch (error) {
      gen.writelog('error',`[general][getCurrentDateTime] Exception: ${error.message}`);
    }
  },
  base64Encode : function(input){
    return btoa(input);    
  },
  base64Decode : function(input){
    return atob(input)
  },    
  makeDir : function(path){
    try 
    {
      if (!fs.existsSync(path)){
        fs.mkdirSync(path);
        return true;
      }      
    } catch (error) {
      gen.writelog('error',`[general][makeDir] Exception: ${error.message}`);
      return false;
    }
  },
  writelog : function(fileName='',strline=''){  
    try 
    {
      let filePath = path.join(index.root,'logs');        
      gen.makeDir(filePath);
  
      filePath = path.join(index.root,'logs',fileName+'.log');
      
      let temp = `${gen.getCurrentDateTime()} => ${strline}`;

      fs.appendFile(filePath,`${temp}\n`,(error)=>{
        throw new Error(error);
      });      
    } catch (error) {
      console.log(`[writelog] exception: ${error.message}`);
    }  
  }
}
module.exports = gen; 
