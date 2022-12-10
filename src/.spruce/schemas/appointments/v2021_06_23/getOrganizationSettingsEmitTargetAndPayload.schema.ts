import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventSourceSchema_v2021_09_13 from '#spruce/schemas/spruceEventUtils/v2021_09_13/eventSource.schema'
import getOrganizationSettingsEmitTargetSchema_v2021_06_23 from '#spruce/schemas/appointments/v2021_06_23/getOrganizationSettingsEmitTarget.schema'
import getOrganizationSettingsEmitPayloadSchema_v2021_06_23 from '#spruce/schemas/appointments/v2021_06_23/getOrganizationSettingsEmitPayload.schema'

const getOrganizationSettingsEmitTargetAndPayloadSchema: SpruceSchemas.Appointments.v2021_06_23.GetOrganizationSettingsEmitTargetAndPayloadSchema  = {
	id: 'getOrganizationSettingsEmitTargetAndPayload',
	version: 'v2021_06_23',
	namespace: 'Appointments',
	name: '',
	    fields: {
	            /** Source. */
	            'source': {
	                label: 'Source',
	                type: 'schema',
	                options: {schema: eventSourceSchema_v2021_09_13,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: getOrganizationSettingsEmitTargetSchema_v2021_06_23,}
	            },
	            /** . */
	            'payload': {
	                type: 'schema',
	                options: {schema: getOrganizationSettingsEmitPayloadSchema_v2021_06_23,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getOrganizationSettingsEmitTargetAndPayloadSchema)

export default getOrganizationSettingsEmitTargetAndPayloadSchema
