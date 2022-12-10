import {
	dateUtil,
	startOfToday,
	tomorrowStartOfDay,
} from '@sprucelabs/calendar-utils'
import AbstractSpruceTest, {
	test,
	assert,
	generateId,
} from '@sprucelabs/test-utils'
import EntityExtractor, {
	NlpService,
	NlpTeammate,
} from '../../extraction/EntityExtractor'

export default class EntityExtractorTest extends AbstractSpruceTest {
	private static extractor: EntityExtractor
	protected static async beforeEach() {
		await super.beforeEach()
		this.extractor = EntityExtractor.Extractor()
	}

	@test()
	protected static async noEntitiesForEmptyString() {
		await this.assertNullResults('')
	}

	@test()
	protected static async canExtractStartDateTime() {
		await this.assertStartDateTimeEquals(
			'tomorrow at 3pm',
			tomorrowStartOfDay(),
			15,
			0
		)

		await this.assertStartDateTimeEquals(
			'tomorrow at 4pm',
			tomorrowStartOfDay(),
			16,
			0
		)

		await this.assertStartDateTimeEquals(
			'tomorrow at 12:15pm',
			tomorrowStartOfDay(),
			12,
			15
		)

		await this.assertStartDateTimeEquals(
			'today at 1:45pm',
			startOfToday(),
			13,
			45
		)
	}

	@test()
	protected static async canAddServices() {
		const service = this.addService('Haircut')

		await this.assertServicesEqual('book a haircut', [service])
		await this.assertServicesEqual('schedule a haircuts', [service])
		await this.assertServicesEqual('reserve a hiarcut', [service])
		await this.assertServicesEqual('book a harct', [service])
		await this.assertNullResults('book beardtrim')
	}

	@test()
	protected static async canAddMultipleServices() {
		const beardTrim = this.addService('Beard Trim')
		const headShave = this.addService('Head Shave')

		await this.assertServicesEqual('book a bread trim and a head shave', [
			beardTrim,
			headShave,
		])
	}

	@test()
	protected static async canPullDateTimeAndServices() {
		this.addService('Haircut')
		const beard = this.addService('Beard trim')
		const utterance = 'book a beard trim for tomorrow at 12pm'

		this.assertStartDateTimeEquals(utterance, tomorrowStartOfDay(), 12, 0)
		await this.assertServicesEqual(utterance, [beard])
	}

	@test()
	protected static async canAddTeammates() {
		const teammate = this.addTay()

		await this.assertTeammatesEqual('book a haircut with taylor', [teammate])
		await this.assertTeammatesEqual('book anything with tylor', [teammate])
		await this.assertTeammatesEqual('book beard trime with Taylor', [teammate])
		await this.assertTeammatesEqual('book beard trime with romero', [teammate])
	}

	@test()
	protected static async canAddMultipleTeammates() {
		const tay = this.addTay()
		const jimi = this.addTeammate('Jimi K.')

		await this.assertTeammatesEqual('book a haircut with taylor or jimi', [
			tay,
			jimi,
		])

		await this.assertTeammatesEqual(
			'book a haircut with taylor and beard trim with jimi',
			[tay, jimi]
		)
	}

	@test()
	protected static async canDoEverything() {
		this.addRandomTeammate()
		this.addRandomTeammate()
		const tay = this.addTay()
		this.addRandomTeammate()

		this.addRandomService()
		const beard = this.addService('Beard trim')
		this.addRandomService()

		const utterance = 'book a beardtrim with taylor for tomorrow at 3pm'
		await this.assertStartDateTimeEquals(utterance, tomorrowStartOfDay(), 15, 0)
		await this.assertTeammatesEqual(utterance, [tay])
		await this.assertServicesEqual(utterance, [beard])
	}

	private static addRandomService() {
		this.addService(generateId())
	}

	private static addRandomTeammate() {
		this.addTeammate(generateId())
	}

	private static addTay() {
		return this.addTeammate('Taylor Romero')
	}

	private static addTeammate(name: string) {
		const nlpTeammate = {
			id: generateId(),
			casualName: name,
		}
		this.extractor.addTeammate(nlpTeammate)
		return nlpTeammate
	}

	private static async assertTeammatesEqual(
		utterance: string,
		expected: NlpTeammate[]
	) {
		const entities = await this.extract(utterance)
		assert.isEqualDeep(entities?.teammates, expected)
	}

	private static async assertServicesEqual(
		utterance: string,
		expected: NlpService[]
	) {
		const results = await this.extract(utterance)
		assert.isEqualDeep(results?.services, expected)
	}

	private static async assertNullResults(utturance: string) {
		const entities = await this.extract(utturance)
		assert.isNull(entities)
	}

	private static addService(name: string) {
		const service = {
			id: generateId(),
			name,
		}
		this.extractor.addService(service)
		return service
	}

	private static async assertStartDateTimeEquals(
		utterance: string,
		date: number,
		hours: number,
		minutes: number
	) {
		const expected = dateUtil.setTimeOfDay(date, hours, minutes, 0, 0)
		const results = await this.extract(utterance)
		assert.isEqual(results?.startDateTimeMs, expected)
	}

	private static async extract(utterance: string) {
		return this.extractor.extract(utterance)
	}
}
