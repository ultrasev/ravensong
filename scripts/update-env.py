import json
import os
import subprocess
from loguru import logger


class EnvParser(dict):
    def __init__(self, fpath: str, *args, **kwargs):
        self.fpath = fpath
        super().__init__(self.read(), *args, **kwargs)

    def __repr__(self) -> str:
        return json.dumps(self, indent=2, ensure_ascii=False)

    def __str__(self) -> str:
        return self.__repr__()

    def read(self) -> dict:
        env_dict = {}
        with open(self.fpath, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip().split("#")[0]
                if line and not line.startswith("#"):
                    key, value = line.split("=", 1)
                    env_dict[key.strip()] = value.strip().strip('"')
        return env_dict

    def write(self, opath: str):
        with open(opath, "w", encoding="utf-8") as f:
            json.dump(self, f, indent=2, ensure_ascii=False)


class CloudflareSecretUpdater(object):
    @staticmethod
    def update(ipath: str):
        logger.info(f"Updating cloudflare secrets from {ipath}")
        with open(ipath, "r") as f:
            return subprocess.check_output(
                ["/usr/local/bin/wrangler", "pages", "secret", "bulk"],
                input=f.read(),
                text=True
            )


def main():
    env_file = ".env.local"
    opath = ".env.json"
    parser = EnvParser(env_file)
    logger.info(parser)
    parser.write(opath)

    response = CloudflareSecretUpdater.update(opath)
    logger.info(response)


if __name__ == "__main__":
    main()
