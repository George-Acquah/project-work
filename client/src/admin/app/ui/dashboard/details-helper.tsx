'use client'

import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Flex, Button, TextInput, Select, SelectItem, Icon } from "@tremor/react";
import { useState } from "react";

export function HelperBtns() {
    return (
      <Flex className="w-4/8 flex-wrap gap-2">
        <Button size="xs" icon={ChevronDoubleLeftIcon} iconPosition="left">
          First Page
        </Button>
        <Button size="xs" icon={ChevronLeftIcon} iconPosition="left">
          Previous Page
        </Button>
        <Button size="xs" icon={ChevronRightIcon} iconPosition="right">
          Next Page
        </Button>
        <Button size="xs" icon={ChevronDoubleRightIcon} iconPosition="right">
          Last Page
        </Button>
      </Flex>
    );
}

export function HelperIconTooltip() {
    return (
      <Icon
        icon={InformationCircleIcon}
        variant="simple"
        tooltip="Shows customer orders"
      />
    );
}


export function HelperInputs() {
    return (
      <TextInput
        type="text"
        placeholder="Enter Page"
        className="max-w-xs w-1/8"
        defaultValue={`2`}
        onChange={(e) => {
          const { value } = e.target;
          if (isNaN(Number(value))) {
            return;
          }
          const page = value ? Number(value) - 1 : 0;
          // setPageIndex(page);
        }}
      />
    );
}

export function HelperSelect() {
    const [pageSize, setPageSize] = useState(10);
    return (
      <div className="space-x-0.5 flex " >
        <Select
          className="w-2/8"
          defaultValue={`${pageSize}`}
          onValueChange={(value) => setPageSize(Number(value))}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <SelectItem key={size} value={`${size}`}>
              {size}
            </SelectItem>
          ))}
        </Select>
        <Icon
          icon={InformationCircleIcon}
          variant="simple"
          tooltip="Select Page Size"
        />
      </div>
    );
}