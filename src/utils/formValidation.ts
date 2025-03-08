
import { getMandatoryFieldsConfig } from '@/api/statusSynchronization';
import { ConfigurableEntityType } from '@/utils/types/configuration';

// Cache for mandatory fields to avoid repeated API calls
const mandatoryFieldsCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 60000; // 1 minute cache

/**
 * Checks if a field is mandatory for a specific entity type
 * @param entityType The type of entity (ticket, asset, release, etc.)
 * @param fieldName The name of the field to check
 * @returns Promise that resolves to a boolean indicating if the field is mandatory
 */
export const isFieldMandatory = async (
  entityType: ConfigurableEntityType,
  fieldName: string
): Promise<boolean> => {
  try {
    // Check cache first
    const cacheKey = `${entityType}-fields`;
    const now = Date.now();
    
    let mandatoryFields;
    
    if (mandatoryFieldsCache[cacheKey] && 
        now - mandatoryFieldsCache[cacheKey].timestamp < CACHE_TTL) {
      // Use cached data
      mandatoryFields = mandatoryFieldsCache[cacheKey].data;
    } else {
      // Fetch fresh data
      mandatoryFields = await getMandatoryFieldsConfig(entityType);
      
      // Update cache
      mandatoryFieldsCache[cacheKey] = {
        data: mandatoryFields,
        timestamp: now
      };
    }
    
    // Find the field in the mandatory fields list
    const field = mandatoryFields.find(f => f.fieldName === fieldName);
    
    // If field exists and is marked as required, return true
    return field ? field.isRequired : false;
  } catch (error) {
    console.error(`Error checking if ${fieldName} is mandatory for ${entityType}:`, error);
    return false; // Default to not mandatory in case of error
  }
};

/**
 * Validates a form object against mandatory fields
 * @param entityType The type of entity (ticket, asset, release, etc.)
 * @param formData The form data object to validate
 * @returns Promise that resolves to an object with validation results
 */
export const validateMandatoryFields = async (
  entityType: ConfigurableEntityType,
  formData: Record<string, any>
): Promise<{ valid: boolean; missingFields: string[] }> => {
  try {
    // Get all mandatory fields for this entity type
    const mandatoryFields = await getMandatoryFieldsConfig(entityType);
    const requiredFields = mandatoryFields.filter(field => field.isRequired);
    
    // Check which required fields are missing
    const missingFields = requiredFields
      .filter(field => {
        const value = formData[field.fieldName];
        return value === undefined || value === null || value === '';
      })
      .map(field => field.displayName);
    
    return {
      valid: missingFields.length === 0,
      missingFields
    };
  } catch (error) {
    console.error(`Error validating mandatory fields for ${entityType}:`, error);
    return { valid: true, missingFields: [] }; // Default to valid in case of error
  }
};
