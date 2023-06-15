import CommanderService from '../../../../src/app/service/commander/CommanderService';

jest.mock('../../../../src/app/service/commander/CommanderService', () => {
  return jest.fn().mockImplementation(() => ({
    start: jest.fn(),
  }));
});

describe(`Testing ${CommanderService.name} class`, () => {
  let commander: CommanderService;

  it('Should instance', () => {
    commander = new CommanderService();
    commander.start();

    expect(commander).not.toBeNull();
  });

  it('should start the commander options', () => {
    const startSpy = jest.spyOn(commander, 'start');
    commander.start();
    expect(startSpy).toHaveBeenCalled();
  });
});
