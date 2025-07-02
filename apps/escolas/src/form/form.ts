/* * */

import { type UpdateSchoolFormType } from '@/form/schema';
import { createFormContext } from '@mantine/form';

/* * */

export const [UpdateSchoolFormProvider, useUpdateSchoolFormContext, useUpdateSchoolForm] = createFormContext<UpdateSchoolFormType>();
