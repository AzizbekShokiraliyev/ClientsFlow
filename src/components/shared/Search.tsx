import { Input } from '@/components/ui/input';
import { FieldGroup } from '@/components/ui/field';
import type { SearchProps } from '@/interface/Interface';

const Search = ({ value, onChange, placeholder = "Search..." }: SearchProps) => {
  return (
    <div className="h-12">
      <form onSubmit={(e) => e.preventDefault()}>
        <FieldGroup>
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}/>
        </FieldGroup>
      </form>
    </div>
  );
};

export default Search;