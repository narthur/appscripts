import gas from 'gas-local';

type Lib = {
  sidebar: () => void;
};

const PropertiesService = {
  getDocumentProperties: vi.fn(() => ({
    getProperties: vi.fn()
  }))
};

const HtmlOutput = {
  setTitle: vi.fn()
};

const Template = {
  evaluate: vi.fn(() => HtmlOutput)
};

const HtmlService = {
  createTemplateFromFile: vi.fn(() => Template)
};

const SpreadsheetApp = {
  getUi: vi.fn(() => ({
    showSidebar: vi.fn()
  }))
};

type Gas = {
  lib: Lib;
  mocks: {
    PropertiesService: typeof PropertiesService;
    HtmlOutput: typeof HtmlOutput;
    Template: typeof Template;
    HtmlService: typeof HtmlService;
    SpreadsheetApp: typeof SpreadsheetApp;
  };
};

export default function mockGas(dir: string): Gas {
  const mockGas = {
    PropertiesService,
    HtmlService,
    SpreadsheetApp,
    __proto__: gas.globalMockDefault
  };

  const lib = gas.require<Lib>(dir, mockGas);

  return {
    lib,
    mocks: {
      PropertiesService,
      HtmlService,
      SpreadsheetApp,
      Template,
      HtmlOutput
    }
  };
}
