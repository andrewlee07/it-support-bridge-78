
import { 
  getAllDropdownConfigurations,
  getDropdownConfigurationsByEntity,
  getDropdownConfigurationById,
  createDropdownConfiguration,
  updateDropdownConfiguration
} from './configurationOperations';

import {
  addDropdownOption,
  updateDropdownOption,
  deleteDropdownOption
} from './optionOperations';

import {
  reorderDropdownOptions
} from './reorderOperations';

// Re-export all functions through a unified API object
export const dropdownConfigurationApi = {
  // Configuration operations
  getAllDropdownConfigurations,
  getDropdownConfigurationsByEntity,
  getDropdownConfigurationById,
  createDropdownConfiguration,
  updateDropdownConfiguration,
  
  // Option operations
  addDropdownOption,
  updateDropdownOption,
  deleteDropdownOption,
  
  // Reorder operations
  reorderDropdownOptions,
};
