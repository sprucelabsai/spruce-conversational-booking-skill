import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventSourceSchema_v2021_09_13 from '#spruce/schemas/spruceEventUtils/v2021_09_13/eventSource.schema'
import syncStatusesEmitTargetSchema_v2021_06_23 from '#spruce/schemas/appointments/v2021_06_23/syncStatusesEmitTarget.schema'
import syncStatusesEmitPayloadSchema_v2021_06_23 from '#spruce/schemas/appointments/v2021_06_23/syncStatusesEmitPayload.schema'

const syncStatusesEmitTargetAndPayloadSchema: SpruceSchemas.Appointments.v2021_06_23.SyncStatusesEmitTargetAndPayloadSchema  = {
	id: 'syncStatusesEmitTargetAndPayload',
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
	                options: {schema: syncStatusesEmitTargetSchema_v2021_06_23,}
	            },
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: syncStatusesEmitPayloadSchema_v2021_06_23,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(syncStatusesEmitTargetAndPayloadSchema)

export default syncStatusesEmitTargetAndPayloadSchema
