
import { v4 as uuidv4 } from 'uuid';
import { format as formatDate } from 'date-fns';

/**
 * Template variable types
 */
type TemplateVariable = string | number | boolean | Date | Record<string, any> | Array<any> | null | undefined;

/**
 * Template context containing all variables
 */
interface TemplateContext {
  [key: string]: TemplateVariable;
}

/**
 * Class for rendering templates with conditional logic and variable substitution
 */
class TemplateEngine {
  /**
   * Render a template with given context
   * @param template The template string
   * @param context Variables to substitute
   * @returns Rendered template
   */
  public static render(template: string, context: TemplateContext): string {
    let result = template;
    
    // Process conditional blocks
    result = this.processConditionalBlocks(result, context);
    
    // Process loops
    result = this.processLoops(result, context);
    
    // Process switches
    result = this.processSwitchBlocks(result, context);
    
    // Process with blocks
    result = this.processWithBlocks(result, context);
    
    // Simple variable replacement
    result = this.replaceVariables(result, context);
    
    return result;
  }

  /**
   * Replace variables in template
   */
  private static replaceVariables(template: string, context: TemplateContext): string {
    return template.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
      // Check if it's a helper function call
      if (path.includes(' ')) {
        return this.processHelper(path.trim(), context);
      }
      
      // Simple variable lookup
      const value = this.getValueFromPath(path.trim(), context);
      return value !== undefined && value !== null 
        ? String(value) 
        : '';
    });
  }

  /**
   * Process helper function calls
   */
  private static processHelper(expression: string, context: TemplateContext): string {
    // Extract helper name and arguments
    const parts = expression.split(' ');
    const helper = parts[0];
    
    switch (helper) {
      case 'formatDate':
        if (parts.length < 3) return '';
        
        const dateValue = this.getValueFromPath(parts[1], context);
        if (!dateValue) return '';
        
        const formatString = parts[2].replace(/["']/g, '');
        
        try {
          return formatDate(new Date(dateValue.toString()), formatString);
        } catch (e) {
          return '';
        }
      
      case 'uppercase':
        if (parts.length < 2) return '';
        const upperValue = this.getValueFromPath(parts[1], context);
        return upperValue ? String(upperValue).toUpperCase() : '';
      
      case 'lowercase':
        if (parts.length < 2) return '';
        const lowerValue = this.getValueFromPath(parts[1], context);
        return lowerValue ? String(lowerValue).toLowerCase() : '';
      
      case 'truncate':
        if (parts.length < 3) return '';
        const truncateValue = this.getValueFromPath(parts[1], context);
        if (!truncateValue) return '';
        
        const length = parseInt(parts[2], 10);
        if (isNaN(length)) return String(truncateValue);
        
        const str = String(truncateValue);
        return str.length > length 
          ? str.substring(0, length) + '...' 
          : str;
      
      default:
        return '';
    }
  }

  /**
   * Process if/else conditionals
   */
  private static processConditionalBlocks(template: string, context: TemplateContext): string {
    let result = template;
    
    // Match {{#if variable}}...{{else}}...{{/if}}
    const ifRegex = /\{\{#if ([^}]+)\}\}([\s\S]*?)(?:\{\{else\}\}([\s\S]*?))?\{\{\/if\}\}/g;
    
    return result.replace(ifRegex, (match, condition, ifContent, elseContent = '') => {
      const value = this.getValueFromPath(condition.trim(), context);
      
      if (value) {
        return this.replaceVariables(ifContent, context);
      } else {
        return this.replaceVariables(elseContent, context);
      }
    });
  }

  /**
   * Process each loops
   */
  private static processLoops(template: string, context: TemplateContext): string {
    let result = template;
    
    // Match {{#each items}}...{{/each}}
    const eachRegex = /\{\{#each ([^}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g;
    
    return result.replace(eachRegex, (match, arrayPath, content) => {
      const array = this.getValueFromPath(arrayPath.trim(), context);
      
      if (!array || !Array.isArray(array)) {
        return '';
      }
      
      return array.map(item => {
        // Create a new context with 'this' pointing to the current item
        const itemContext = { ...context, this: item };
        return this.replaceVariables(content, itemContext);
      }).join('');
    });
  }

  /**
   * Process switch/case statements
   */
  private static processSwitchBlocks(template: string, context: TemplateContext): string {
    let result = template;
    
    // Match {{#switch variable}}...{{#case "value"}}...{{/case}}...{{#default}}...{{/default}}...{{/switch}}
    const switchRegex = /\{\{#switch ([^}]+)\}\}([\s\S]*?)\{\{\/switch\}\}/g;
    
    return result.replace(switchRegex, (match, variable, content) => {
      const value = this.getValueFromPath(variable.trim(), context);
      
      // Extract cases
      const caseRegex = /\{\{#case "([^"]+)"\}\}([\s\S]*?)\{\{\/case\}\}/g;
      let caseMatch;
      let matched = false;
      let output = '';
      
      while ((caseMatch = caseRegex.exec(content)) !== null) {
        const caseValue = caseMatch[1];
        const caseContent = caseMatch[2];
        
        if (value === caseValue) {
          output = this.replaceVariables(caseContent, context);
          matched = true;
          break;
        }
      }
      
      // If no case matched, look for default
      if (!matched) {
        const defaultRegex = /\{\{#default\}\}([\s\S]*?)\{\{\/default\}\}/;
        const defaultMatch = content.match(defaultRegex);
        
        if (defaultMatch) {
          output = this.replaceVariables(defaultMatch[1], context);
        }
      }
      
      return output;
    });
  }

  /**
   * Process with blocks that change context
   */
  private static processWithBlocks(template: string, context: TemplateContext): string {
    let result = template;
    
    // Match {{#with variable}}...{{/with}}
    const withRegex = /\{\{#with ([^}]+)\}\}([\s\S]*?)\{\{\/with\}\}/g;
    
    return result.replace(withRegex, (match, objectPath, content) => {
      const object = this.getValueFromPath(objectPath.trim(), context);
      
      if (!object || typeof object !== 'object') {
        return '';
      }
      
      // Create a new context with the object's properties
      return this.replaceVariables(content, object as TemplateContext);
    });
  }

  /**
   * Get a value from a path like "user.profile.name"
   */
  private static getValueFromPath(path: string, context: TemplateContext): TemplateVariable {
    const parts = path.split('.');
    let value: any = context;
    
    for (const part of parts) {
      if (value === null || value === undefined) {
        return undefined;
      }
      
      value = value[part];
    }
    
    return value;
  }
}

export default TemplateEngine;
