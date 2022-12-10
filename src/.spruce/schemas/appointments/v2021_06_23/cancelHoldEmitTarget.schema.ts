import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const cancelHoldEmitTargetSchema: SpruceSchemas.Appointments.v2021_06_23.CancelHoldEmitTargetSchema  = {
	id: 'cancelHoldEmitTarget',
	version: 'v2021_06_23',
	namespace: 'Appointments',
	name: '',
	    fields: {
	            /** . */
	            'locationId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'holdId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(cancelHoldEmitTargetSchema)

export default cancelHoldEmitTargetSchema
