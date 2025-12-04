import { ParameterDescription, ClassSkillDescription, StandardPersonalSkillDescription } from '../src/logic/servant/servant_description'
import { writeFileSync } from 'fs'

writeFileSync('./parameter_description.json', JSON.stringify(ParameterDescription, null, 2))
writeFileSync('./class_skill_description.json', JSON.stringify(ClassSkillDescription, null, 2))
writeFileSync('./personal_skill_description.json', JSON.stringify(StandardPersonalSkillDescription, null, 2))
