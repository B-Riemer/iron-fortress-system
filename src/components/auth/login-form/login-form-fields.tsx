import { Input } from "@/components/ui/input/input";
import { InputLabel } from "@/components/ui/input/input-label";

export function LoginFormFields() {
  return (
    <>
      <div>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="operator@ironfortress.com"
        />
      </div>

      <div>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="••••••••"
        />
      </div>
    </>
  );
}

