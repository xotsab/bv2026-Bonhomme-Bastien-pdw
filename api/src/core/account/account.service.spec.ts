import { type Mock, vi } from 'vitest';
import type { Repository } from 'typeorm';

import { ApiCodeResponse, ApiException } from '../../common/api/index.js';

import { AccountService } from './account.service.js';
import { AccountEntity } from './data/entity/account.entity.js';
import { AccountStatus } from './data/enum/account-status.enum.js';

describe('AccountService', () => {
  const accountId = '01ARZ3NDEKTSV4RRFFQ69G5FAV';
  let repository: Pick<Repository<AccountEntity>, 'findOneBy'>;
  let service: AccountService;

  beforeEach(() => {
    repository = {
      findOneBy: vi.fn(),
    };
    service = new AccountService(repository as Repository<AccountEntity>);
  });

  it('maps the current account through an explicit public allowlist', async () => {
    const createdAt = new Date('2026-08-19T12:00:00.000Z');
    const updatedAt = new Date('2026-08-19T13:00:00.000Z');
    const account = Object.assign(new AccountEntity(), {
      id: accountId,
      status: AccountStatus.Active,
      anonymizedAt: null,
      createdAt,
      updatedAt,
      version: 7,
    });
    vi.mocked(repository.findOneBy).mockResolvedValue(account);

    await expect(service.me(accountId)).resolves.toEqual({
      id: accountId,
      status: AccountStatus.Active,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    });
  });

  it('returns a stable API error when the current account is missing', async () => {
    vi.mocked(repository.findOneBy).mockResolvedValue(null);

    await expect(service.me(accountId)).rejects.toMatchObject({
      apiCode: ApiCodeResponse.AccountNotFound,
    });
  });
});
