// Import all workflow functions
import { ENUM_FRAMEWORK, ENUM_LANGUAGE } from '@/data/enum';
import { djangoWorkflow } from './django_workflow';
import { expressWorkflow } from './express_workflow';
import { nestjsWorkflow } from './nestjs_workflow';
import { nextjsWorkflow } from './nextjs_workflow';
import { reactWorkflow } from './react_workflow';
import { htmlWorkflow } from './html_workflow';
import { aspNetWorkflow } from './aspNet_workflow';
import { springBootWorkflow } from './springBoot_workflow';
import { flaskWorkflow } from './flask_workflow';
import { nodejsWorkflow } from './nodejs_workflow';
import { laravelWorkflow } from './laravel_workflow';

// Export all workflow templates
export { djangoWorkflow } from './django_workflow';
export { expressWorkflow } from './express_workflow';
export { nestjsWorkflow } from './nestjs_workflow';
export { nextjsWorkflow } from './nextjs_workflow';
export { reactWorkflow } from './react_workflow';
export { workflowProperties } from './workflow_properties';
export { aspNetProperty } from './aspNet_properties';
export { htmlWorkflow } from './html_workflow';
export { aspNetWorkflow } from './aspNet_workflow';
export { springBootWorkflow } from './springBoot_workflow';
export { flaskWorkflow } from './flask_workflow';
export { nodejsWorkflow } from './nodejs_workflow';
export { laravelWorkflow } from './laravel_workflow';

import { springBootProperty } from './springBoot_properties';
import { workflowProperties } from './workflow_properties';
import { aspNetProperty } from './aspNet_properties';
import { laravelProperty } from './laravel_properties';

// Workflow map for easy access
export const workflowTemplates = {
  [ENUM_LANGUAGE.JAVASCRIPT_TYPESCRIPT]: {
    [ENUM_FRAMEWORK.EXPRESS]: expressWorkflow, //ok
    [ENUM_FRAMEWORK.NESTJS]: nestjsWorkflow, //ok
    [ENUM_FRAMEWORK.REACT]: reactWorkflow, //ok
    [ENUM_FRAMEWORK.NEXTJS]: nextjsWorkflow, //ok
    [ENUM_FRAMEWORK.NODEJS]: nodejsWorkflow, //ok
  },
  [ENUM_LANGUAGE.PYTHON]: {
    [ENUM_FRAMEWORK.DJANGO]: djangoWorkflow, //ok
    [ENUM_FRAMEWORK.FLASK]: flaskWorkflow, //ok
  },
  [ENUM_LANGUAGE.JAVA]: {
    [ENUM_FRAMEWORK.SPRING_BOOT]: springBootWorkflow, //ok
  },
  [ENUM_LANGUAGE.DOTNET]: {
    // FIXME: not ok
    [ENUM_FRAMEWORK.ASP_NET]: aspNetWorkflow, //not ok
  },
  [ENUM_LANGUAGE.PHP]: {
    [ENUM_FRAMEWORK.LARAVEL]: laravelWorkflow, //ok
  },
  [ENUM_LANGUAGE.STATIC]: {
    [ENUM_FRAMEWORK.HTML]: htmlWorkflow, //ok
  },
};

export const propertiesTemplates = {
  [ENUM_LANGUAGE.JAVASCRIPT_TYPESCRIPT]: {
    [ENUM_FRAMEWORK.EXPRESS]: workflowProperties, //ok
    [ENUM_FRAMEWORK.NESTJS]: workflowProperties, //ok
    [ENUM_FRAMEWORK.REACT]: workflowProperties, //ok
    [ENUM_FRAMEWORK.NEXTJS]: workflowProperties, //ok
    [ENUM_FRAMEWORK.NODEJS]: workflowProperties, //ok
  },
  [ENUM_LANGUAGE.PYTHON]: {
    [ENUM_FRAMEWORK.DJANGO]: workflowProperties, //ok
    [ENUM_FRAMEWORK.FLASK]: workflowProperties, //ok
  },
  [ENUM_LANGUAGE.JAVA]: {
    [ENUM_FRAMEWORK.SPRING_BOOT]: springBootProperty, //ok
  },
  [ENUM_LANGUAGE.DOTNET]: {
    // FIXME: not ok
    [ENUM_FRAMEWORK.ASP_NET]: aspNetProperty, //not ok
  },
  [ENUM_LANGUAGE.PHP]: {
    [ENUM_FRAMEWORK.LARAVEL]: laravelProperty, //ok
  },
  [ENUM_LANGUAGE.STATIC]: {
    [ENUM_FRAMEWORK.HTML]: workflowProperties, //ok
  },
};
