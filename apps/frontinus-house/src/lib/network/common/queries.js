"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEADERBOARD_QUERY = exports.USER_QUERY = exports.SPACES_QUERY = exports.SPACE_QUERY = exports.USER_VOTES_QUERY = exports.VOTES_QUERY = exports.PROPOSALS_QUERY = exports.PROPOSAL_QUERY = void 0;
var graphql_tag_1 = require("graphql-tag");
var SPACE_FRAGMENT = (0, graphql_tag_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment spaceFragment on Space {\n    id\n    metadata {\n      name\n      avatar\n      cover\n      about\n      external_url\n      github\n      twitter\n      discord\n      voting_power_symbol\n      treasuries\n      delegations\n      executors\n      executors_types\n      executors_destinations\n      executors_strategies {\n        id\n        address\n        destination_address\n        type\n        treasury_chain\n        treasury\n      }\n    }\n    controller\n    voting_delay\n    min_voting_period\n    max_voting_period\n    proposal_threshold\n    validation_strategy\n    validation_strategy_params\n    voting_power_validation_strategy_strategies\n    voting_power_validation_strategy_strategies_params\n    voting_power_validation_strategies_parsed_metadata {\n      index\n      data {\n        name\n        description\n        decimals\n        symbol\n        token\n        payload\n      }\n    }\n    strategies_indicies\n    strategies\n    strategies_params\n    strategies_parsed_metadata {\n      index\n      data {\n        name\n        description\n        decimals\n        symbol\n        token\n        payload\n      }\n    }\n    authenticators\n    proposal_count\n    vote_count\n    created\n  }\n"], ["\n  fragment spaceFragment on Space {\n    id\n    metadata {\n      name\n      avatar\n      cover\n      about\n      external_url\n      github\n      twitter\n      discord\n      voting_power_symbol\n      treasuries\n      delegations\n      executors\n      executors_types\n      executors_destinations\n      executors_strategies {\n        id\n        address\n        destination_address\n        type\n        treasury_chain\n        treasury\n      }\n    }\n    controller\n    voting_delay\n    min_voting_period\n    max_voting_period\n    proposal_threshold\n    validation_strategy\n    validation_strategy_params\n    voting_power_validation_strategy_strategies\n    voting_power_validation_strategy_strategies_params\n    voting_power_validation_strategies_parsed_metadata {\n      index\n      data {\n        name\n        description\n        decimals\n        symbol\n        token\n        payload\n      }\n    }\n    strategies_indicies\n    strategies\n    strategies_params\n    strategies_parsed_metadata {\n      index\n      data {\n        name\n        description\n        decimals\n        symbol\n        token\n        payload\n      }\n    }\n    authenticators\n    proposal_count\n    vote_count\n    created\n  }\n"])));
var PROPOSAL_FRAGMENT = (0, graphql_tag_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  fragment proposalFragment on Proposal {\n    id\n    proposal_id\n    space {\n      id\n      controller\n      authenticators\n      metadata {\n        id\n        name\n        avatar\n        voting_power_symbol\n        executors\n        executors_types\n      }\n      strategies_parsed_metadata {\n        index\n        data {\n          name\n          description\n          decimals\n          symbol\n          token\n          payload\n        }\n      }\n    }\n    author {\n      id\n    }\n    quorum\n    execution_hash\n    metadata {\n      id\n      title\n      body\n      discussion\n      execution\n    }\n    start\n    min_end\n    max_end\n    snapshot\n    scores_1\n    scores_2\n    scores_3\n    scores_total\n    execution_time\n    execution_strategy\n    execution_strategy_type\n    execution_destination\n    timelock_veto_guardian\n    strategies_indicies\n    strategies\n    strategies_params\n    created\n    edited\n    tx\n    execution_tx\n    veto_tx\n    vote_count\n    execution_ready\n    executed\n    vetoed\n    completed\n    cancelled\n  }\n"], ["\n  fragment proposalFragment on Proposal {\n    id\n    proposal_id\n    space {\n      id\n      controller\n      authenticators\n      metadata {\n        id\n        name\n        avatar\n        voting_power_symbol\n        executors\n        executors_types\n      }\n      strategies_parsed_metadata {\n        index\n        data {\n          name\n          description\n          decimals\n          symbol\n          token\n          payload\n        }\n      }\n    }\n    author {\n      id\n    }\n    quorum\n    execution_hash\n    metadata {\n      id\n      title\n      body\n      discussion\n      execution\n    }\n    start\n    min_end\n    max_end\n    snapshot\n    scores_1\n    scores_2\n    scores_3\n    scores_total\n    execution_time\n    execution_strategy\n    execution_strategy_type\n    execution_destination\n    timelock_veto_guardian\n    strategies_indicies\n    strategies\n    strategies_params\n    created\n    edited\n    tx\n    execution_tx\n    veto_tx\n    vote_count\n    execution_ready\n    executed\n    vetoed\n    completed\n    cancelled\n  }\n"])));
exports.PROPOSAL_QUERY = (0, graphql_tag_1.default)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  query ($id: String!) {\n    proposal(id: $id) {\n      ...proposalFragment\n    }\n  }\n  ", "\n"], ["\n  query ($id: String!) {\n    proposal(id: $id) {\n      ...proposalFragment\n    }\n  }\n  ", "\n"])), PROPOSAL_FRAGMENT);
exports.PROPOSALS_QUERY = (0, graphql_tag_1.default)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  query ($first: Int!, $skip: Int!, $where: Proposal_filter) {\n    proposals(\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: created\n      orderDirection: desc\n    ) {\n      ...proposalFragment\n    }\n  }\n  ", "\n"], ["\n  query ($first: Int!, $skip: Int!, $where: Proposal_filter) {\n    proposals(\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: created\n      orderDirection: desc\n    ) {\n      ...proposalFragment\n    }\n  }\n  ", "\n"])), PROPOSAL_FRAGMENT);
exports.VOTES_QUERY = (0, graphql_tag_1.default)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  query (\n    $first: Int!\n    $skip: Int!\n    $orderBy: Vote_orderBy!\n    $orderDirection: OrderDirection!\n    $where: Vote_filter\n  ) {\n    votes(\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      voter {\n        id\n      }\n      space {\n        id\n      }\n      proposal\n      choice\n      vp\n      created\n      tx\n    }\n  }\n"], ["\n  query (\n    $first: Int!\n    $skip: Int!\n    $orderBy: Vote_orderBy!\n    $orderDirection: OrderDirection!\n    $where: Vote_filter\n  ) {\n    votes(\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      id\n      voter {\n        id\n      }\n      space {\n        id\n      }\n      proposal\n      choice\n      vp\n      created\n      tx\n    }\n  }\n"])));
exports.USER_VOTES_QUERY = (0, graphql_tag_1.default)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  query ($spaceIds: [String], $voter: String) {\n    votes(where: { space_in: $spaceIds, voter: $voter }) {\n      id\n      voter {\n        id\n      }\n      space {\n        id\n      }\n      proposal\n      choice\n      vp\n      created\n    }\n  }\n"], ["\n  query ($spaceIds: [String], $voter: String) {\n    votes(where: { space_in: $spaceIds, voter: $voter }) {\n      id\n      voter {\n        id\n      }\n      space {\n        id\n      }\n      proposal\n      choice\n      vp\n      created\n    }\n  }\n"])));
exports.SPACE_QUERY = (0, graphql_tag_1.default)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  query ($id: String!) {\n    space(id: $id) {\n      ...spaceFragment\n    }\n  }\n  ", "\n"], ["\n  query ($id: String!) {\n    space(id: $id) {\n      ...spaceFragment\n    }\n  }\n  ", "\n"])), SPACE_FRAGMENT);
exports.SPACES_QUERY = (0, graphql_tag_1.default)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  query ($first: Int!, $skip: Int!, $where: Space_filter) {\n    spaces(\n      first: $first\n      skip: $skip\n      orderBy: vote_count\n      orderDirection: desc\n      where: $where\n    ) {\n      ...spaceFragment\n    }\n  }\n  ", "\n"], ["\n  query ($first: Int!, $skip: Int!, $where: Space_filter) {\n    spaces(\n      first: $first\n      skip: $skip\n      orderBy: vote_count\n      orderDirection: desc\n      where: $where\n    ) {\n      ...spaceFragment\n    }\n  }\n  ", "\n"])), SPACE_FRAGMENT);
exports.USER_QUERY = (0, graphql_tag_1.default)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  query ($id: String!) {\n    user(id: $id) {\n      id\n      proposal_count\n      vote_count\n      created\n    }\n  }\n"], ["\n  query ($id: String!) {\n    user(id: $id) {\n      id\n      proposal_count\n      vote_count\n      created\n    }\n  }\n"])));
exports.LEADERBOARD_QUERY = (0, graphql_tag_1.default)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  query (\n    $first: Int!\n    $skip: Int!\n    $orderBy: Leaderboard_orderBy\n    $orderDirection: OrderDirection!\n    $where: Leaderboard_filter\n  ) {\n    leaderboards(\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      user {\n        id\n        created\n      }\n      proposal_count\n      vote_count\n    }\n  }\n"], ["\n  query (\n    $first: Int!\n    $skip: Int!\n    $orderBy: Leaderboard_orderBy\n    $orderDirection: OrderDirection!\n    $where: Leaderboard_filter\n  ) {\n    leaderboards(\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      user {\n        id\n        created\n      }\n      proposal_count\n      vote_count\n    }\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
