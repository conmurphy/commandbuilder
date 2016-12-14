/**
*
*   This is for shared traversal functions
*   
*   @author Conor Murphy
*
*   @module traversal
*/


//import config details - gitignored
var env = process.env.NODE_ENV || 'development';

var validationErrors = [];

module.exports =
{

    
    /**
    *
    *   
    *   Begin building the command tree. Returns a tree as well as any validation errors. We build the complete tree to gather all errors at once.
    * 
    *   @function buildTree
    *
    *   @author Conor Murphy
    *
    *   @param {object} obj Current command reference object. Contains only current command level and below
    *
    */
    buildTree:function(obj) {
        
        tree =  '<div class="treeConnectors"><ul>'
        vars =  module.exports.traverse(obj,tree,0,obj,[]);
        tree = vars.tree;
        tree +=  '</ul></div>'
        
        validationErrors = vars.validationErrors;
        return {
            tree:tree,
            validationErrors:validationErrors
        };
                         
                        
    },

    traverse:function(obj,tree,level,parentObj,validationErrors) {

        //check if we have already validated that a structure is correct - for leaf objects it runs through multiple times so we only need to store a single validationError
        validated = false;

        //start the unordered list - not used for trunk/level 0
        if (level != 0 )
        {
            tree += '<ul>';
            
        }
                    
        //for each property in the object
        for (var prop in obj) {


            //if it's an object i.e. it's not a final leaf command then go one level deeper

            if(typeof obj[prop] == 'object' && obj[prop])
            { 
                //$$ is used for user input variable
                if(prop == "$$")
                {   

                    //if we haven't already validated then check there's an argumentName with the user input, otherwise store the error in validationErrors
                    if (!validated)
                    {
                        if(('argumentName' in obj) && obj.argumentName != '')
                        {
                            commandValid = true;
                        }
                        else
                        {
                            validationErrors.push([{'object':parentObj,'attribute':'argumentName','issue':'Missing argumentName from $$'}]);

                        }

                        validated = true;
                    }
                   
                    //add a new list item using the property name and then traverse the next level
                    //store any validationErrors

                    tree += '<li elementType="branch" class="parent_li" id=' +prop + '>';
                    tree += '<span style="font-size:22px; color:#26384D">'+prop+'</span>';
                    vars = module.exports.traverse(obj[prop],tree, level + 1,prop,validationErrors);
                    tree = vars.tree;
                    validationErrors = vars.validationErrors;
                    tree += '</li>'  
                   
                }
                else if(prop == "$regex$")
                {

                    //$regex$ allows for user input which follows a regex pattern

                    //TODO: Need to make note that we don't check the regex pattern itself
                    //TODO: validate regex pattern
                    
                    //add a new list item using the property name and then traverse the next level
                    //store any validationErrors
                    tree += '<li elementType="branch" class="parent_li" id=' +prop + '>';
                    tree += '<span style="font-size:22; color:#26384D">'+prop+'</span>';
                    vars = module.exports.traverse(obj[prop],tree, level + 1,prop,validationErrors);
                    tree = vars.tree;
                    validationErrors = vars.validationErrors;
                    tree += '</li>'
                  
                }
                else if(prop != '')
                {
                    
                    //add a new list item using the property name and then traverse the next level
                    //store any validationErrors

                    tree += '<li elementType="branch" class="parent_li" id=' +prop + '>';
                    tree += '<span style="font-size:22px; color:#26384D">'+prop+'</span>';
                    vars = module.exports.traverse(obj[prop],tree, level + 1,prop,validationErrors);
                    tree = vars.tree;
                    validationErrors = vars.validationErrors;
                    tree += '</li>'
                 
                }
            }
            else 
            {
                            
                //if its not an object then its at the end of the branch and a leaf
                //in this case we don't care about the usage or argumentName properties. These were covered earlier

                if(prop != 'usage')
                {
                    /**
                    *
                    *   Leaf Rules:
                    *
                    *   "commandType":"readonly"
                    *   "name": (required)
                    *   "detail": (required)
                    *   
                    *   "commandType":"function"
                    *   "function": (required)
                    *
                    */

                    //if it's not already valid then go through the process. Ensure the structure matches the rules above otherwise add to the validationErrors list
                    if (!validated)
                    {
                        if(obj.commandType == 'readonly')
                        {
                           
                            
                            if(('detail' in obj) && obj.detail != '')
                            {
                                commandValid = true;
                            }
                            else{
                                validationErrors.push([{'object':parentObj,'attribute':'detail','issue':'Missing detail from commandtype:readonly'}]);
                            }
                        }
                        else if(obj.commandType == 'function')
                        {
                            if('function' in obj)
                            {
                                commandValid = true;
                            }
                            else
                            {
                                validationErrors.push([{'object':parentObj,'attribute':'function','issue':'Missing function from commandtype:function'}]);
                            }
                            
                        }
                        else 
                        {
                            validationErrors.push([{'object':parentObj,'attribute':'commandType','issue':'commandType not recognized'}]);
                            
                        }

                        validated = true;
                    }

                    //add the leaf list item
                    tree += '<li elementType="leaf" id="' + prop + '"  hidden>' + obj[prop] +'</li>';
                    
                    
                }
                

                                
                
            }
        }
        
        //close off the list at this level - remember it's traversal so there will most likely be multiple levels
        tree += '</ul>';

        //return the tree and any errors - check ajax for the result and publishing
        return {
            tree:tree,
            validationErrors:validationErrors
        };
                         
                        
    }
   
    

    
    

}