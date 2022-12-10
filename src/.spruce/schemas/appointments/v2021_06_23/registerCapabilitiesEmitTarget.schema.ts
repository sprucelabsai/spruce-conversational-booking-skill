import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const registerCapabilitiesEmitTargetSchema: SpruceSchemas.Appointments.v2021_06_23.RegisterCapabilitiesEmitTargetSchema  = {
	id: 'registerCapabilitiesEmitTarget',
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
	    }
}

SchemaRegistry.getInstance().trackSchema(registerCapabilitiesEmitTargetSchema)

export default registerCapabilitiesEmitTargetSchema
