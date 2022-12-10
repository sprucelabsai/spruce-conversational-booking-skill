import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const listServicesWithProvidersEmitTargetSchema: SpruceSchemas.Appointments.v2021_06_23.ListServicesWithProvidersEmitTargetSchema  = {
	id: 'listServicesWithProvidersEmitTarget',
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

SchemaRegistry.getInstance().trackSchema(listServicesWithProvidersEmitTargetSchema)

export default listServicesWithProvidersEmitTargetSchema
