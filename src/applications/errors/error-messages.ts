export const errorMessages = {
  user: {
    notFound: 'Usuário não encontrado!',
    invalidName: 'O nome utilizado é inválido',
    emailAlreadyUsed: 'O email informado já está cadastrado!',
    invalidEmailOrPassword: 'O email e/ou senha inválido',
    expiredToken: 'Você foi desconectado, faça o login novamente!',
  },
  company: {
    notFound: 'Empresa não encontrada!',
    cnpjInvalid: 'O CNPJ utilizado é inválido',
    cnpjAlreadyInUse: 'O CNPJ utilizado já está em uso',
  },
  location: {
    notFound: 'Local não encontrado!',
    cepInvalid: 'Cep informado é inválido',
  },
};

export const INTERNAL_SERVER_ERROR_MESSAGE = 'Ocorreu algo de errado';
