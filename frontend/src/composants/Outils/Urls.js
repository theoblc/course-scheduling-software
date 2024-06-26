/**
 *  Ce fichier définit les URL de l'API utilisée dans PEPH.
 */

const baseURL = "http://127.0.0.1:8000/api";

export const getModulesURL = () => `${baseURL}/modules/`;
export const getModuleURL = (module_id) => `${baseURL}/modules/${module_id}/`;
export const getModuleCoursURL = (module_id) =>
  `${baseURL}/modules/${module_id}/cours/`;
export const getModuleSeancesURL = (module_id) =>
  `${baseURL}/modules/${module_id}/seances/`;
export const getEnseignantsURL = () => `${baseURL}/enseignants/`;
export const getSallesURL = () => `${baseURL}/salles/`;
export const getSeancesURL = () => `${baseURL}/seances/`;
export const getCoursURL = () => `${baseURL}/cours/`;
export const getConflitsURL = () => `${baseURL}/seances/chevauchements`;
